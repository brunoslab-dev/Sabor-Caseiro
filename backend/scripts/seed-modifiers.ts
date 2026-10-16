
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const restaurantId = "sabor-caseiro-main";

type OptionSeed = {
  name: string;
  priceDeltaCents?: number;
  isDefault?: boolean;
};

type GroupSeed = {
  name: string;
  minSelections: number;
  maxSelections: number;
  isRequired: boolean;
  options: OptionSeed[];
};

const catalog: Record<string, GroupSeed[]> = {
  "traditional-cod": [
    {
      name: "Choose Your Side",
      minSelections: 1,
      maxSelections: 1,
      isRequired: true,
      options: [
        { name: "Roasted Potatoes", isDefault: true },
        { name: "French Fries", priceDeltaCents: 150 },
        { name: "White Rice", priceDeltaCents: 100 },
      ],
    },
    {
      name: "Cod Extras",
      minSelections: 0,
      maxSelections: 3,
      isRequired: false,
      options: [
        { name: "Extra Egg", priceDeltaCents: 120 },
        { name: "Extra Cod", priceDeltaCents: 450 },
        { name: "Extra Olives", priceDeltaCents: 80 },
      ],
    },
  ],
  "special-francesinha": [
    {
      name: "Francesinha Extras",
      minSelections: 0,
      maxSelections: 3,
      isRequired: false,
      options: [
        { name: "Extra Cheese", priceDeltaCents: 150 },
        { name: "Extra Fried Egg", priceDeltaCents: 120 },
        { name: "Extra French Fries", priceDeltaCents: 250 },
      ],
    },
  ],
  "seafood-paella": [
    {
      name: "Paella Extras",
      minSelections: 0,
      maxSelections: 2,
      isRequired: false,
      options: [
        { name: "Extra Prawns", priceDeltaCents: 350 },
        { name: "Extra Seafood", priceDeltaCents: 450 },
      ],
    },
  ],
  "grilled-picanha-premium": [
    {
      name: "Choose Doneness",
      minSelections: 1,
      maxSelections: 1,
      isRequired: true,
      options: [
        { name: "Medium Rare", isDefault: true },
        { name: "Medium" },
        { name: "Well Done" },
      ],
    },
    {
      name: "Picanha Extras",
      minSelections: 0,
      maxSelections: 3,
      isRequired: false,
      options: [
        { name: "Extra Steak", priceDeltaCents: 500 },
        { name: "Extra French Fries", priceDeltaCents: 250 },
        { name: "Extra Rice", priceDeltaCents: 150 },
      ],
    },
  ],
  "grilled-lemon-salmon": [
    {
      name: "Salmon Extras",
      minSelections: 0,
      maxSelections: 2,
      isRequired: false,
      options: [
        { name: "Extra Salmon", priceDeltaCents: 500 },
        { name: "Extra Potatoes", priceDeltaCents: 150 },
      ],
    },
  ],
  "creamy-prawn-fettuccine": [
    {
      name: "Fettuccine Extras",
      minSelections: 0,
      maxSelections: 2,
      isRequired: false,
      options: [
        { name: "Extra Prawns", priceDeltaCents: 350 },
        { name: "Extra Parmesan", priceDeltaCents: 120 },
      ],
    },
  ],
  "house-premium-soda": [
    {
      name: "Choose Size",
      minSelections: 1,
      maxSelections: 1,
      isRequired: true,
      options: [
        { name: "Regular", isDefault: true },
        { name: "Large", priceDeltaCents: 100 },
      ],
    },
  ],
  "specialty-coffee": [
    {
      name: "Choose Milk",
      minSelections: 0,
      maxSelections: 1,
      isRequired: false,
      options: [
        { name: "Regular Milk", isDefault: true },
        { name: "Oat Milk", priceDeltaCents: 70 },
        { name: "No Milk" },
      ],
    },
  ],
  "fresh-lemonade": [
    {
      name: "Choose Size",
      minSelections: 1,
      maxSelections: 1,
      isRequired: true,
      options: [
        { name: "Regular", isDefault: true },
        { name: "Large", priceDeltaCents: 120 },
      ],
    },
  ],
  "strawberry-supreme-tart": [
    {
      name: "Tart Extras",
      minSelections: 0,
      maxSelections: 2,
      isRequired: false,
      options: [
        { name: "Extra Cream", priceDeltaCents: 100 },
        { name: "Vanilla Ice Cream", priceDeltaCents: 180 },
      ],
    },
  ],
  "dark-chocolate-mousse": [
    {
      name: "Mousse Extras",
      minSelections: 0,
      maxSelections: 2,
      isRequired: false,
      options: [
        { name: "Extra Chocolate", priceDeltaCents: 100 },
        { name: "Vanilla Ice Cream", priceDeltaCents: 180 },
      ],
    },
  ],
  "red-berry-cheesecake": [
    {
      name: "Cheesecake Extras",
      minSelections: 0,
      maxSelections: 2,
      isRequired: false,
      options: [
        { name: "Extra Berries", priceDeltaCents: 150 },
        { name: "Vanilla Ice Cream", priceDeltaCents: 180 },
      ],
    },
  ],
};

async function main() {
  const products = await prisma.product.findMany({
    where: { restaurantId },
    select: { id: true, slug: true },
  });

  const productBySlug = new Map(products.map((p) => [p.slug, p]));

  for (const [slug, groups] of Object.entries(catalog)) {
    const product = productBySlug.get(slug);

    if (!product) {
      throw new Error(`Product not found: ${slug}. Import the catalog first.`);
    }

    for (let groupIndex = 0; groupIndex < groups.length; groupIndex++) {
      const groupSeed = groups[groupIndex];

      const group = await prisma.modifierGroup.upsert({
        where: {
          id: `sc-${slug}-${groupIndex + 1}`,
        },
        update: {
          name: groupSeed.name,
          minSelections: groupSeed.minSelections,
          maxSelections: groupSeed.maxSelections,
          isRequired: groupSeed.isRequired,
          isActive: true,
          sortOrder: groupIndex,
        },
        create: {
          id: `sc-${slug}-${groupIndex + 1}`,
          restaurantId,
          name: groupSeed.name,
          minSelections: groupSeed.minSelections,
          maxSelections: groupSeed.maxSelections,
          isRequired: groupSeed.isRequired,
          sortOrder: groupIndex,
        },
      });

      await prisma.productModifierGroup.upsert({
        where: {
          productId_groupId: {
            productId: product.id,
            groupId: group.id,
          },
        },
        update: { sortOrder: groupIndex },
        create: {
          productId: product.id,
          groupId: group.id,
          sortOrder: groupIndex,
        },
      });

      for (
        let optionIndex = 0;
        optionIndex < groupSeed.options.length;
        optionIndex++
      ) {
        const optionSeed = groupSeed.options[optionIndex];
        const optionId = `${group.id}-option-${optionIndex + 1}`;

        await prisma.modifierOption.upsert({
          where: { id: optionId },
          update: {
            name: optionSeed.name,
            priceDeltaCents: optionSeed.priceDeltaCents ?? 0,
            isDefault: optionSeed.isDefault ?? false,
            isAvailable: true,
            sortOrder: optionIndex,
          },
          create: {
            id: optionId,
            groupId: group.id,
            name: optionSeed.name,
            priceDeltaCents: optionSeed.priceDeltaCents ?? 0,
            isDefault: optionSeed.isDefault ?? false,
            sortOrder: optionIndex,
          },
        });
      }
    }
  }

  console.log("Modifier groups and options imported successfully.");
}

main()
  .catch((error) => {
    console.error("Modifier import failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
