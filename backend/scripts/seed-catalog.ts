import { PrismaClient, ProductType } from "@prisma/client";

const prisma = new PrismaClient();

const restaurantId = "sabor-caseiro-main";

const categories = [
  { name: "Main Courses", slug: "main", sortOrder: 1 },
  { name: "Drinks", slug: "drink", sortOrder: 2 },
  { name: "Desserts", slug: "dessert", sortOrder: 3 },
];

const products = [
  {
    name: "Traditional Cod",
    slug: "traditional-cod",
    category: "main",
    description: "Traditional Portuguese cod served with your choice of side.",
    priceCents: 1890,
    imageUrl: "images/dishes/traditional-cod.webp",
    sortOrder: 1,
  },
  {
    name: "Special Francesinha",
    slug: "special-francesinha",
    category: "main",
    description: "A rich Portuguese sandwich with delicious accompaniments.",
    priceCents: 1690,
    imageUrl: "images/dishes/special-francesinha.webp",
    sortOrder: 2,
  },
  {
    name: "Seafood Paella",
    slug: "seafood-paella",
    category: "main",
    description: "Seafood paella full of flavour.",
    priceCents: 2190,
    imageUrl: "images/dishes/seafood-paella.webp",
    sortOrder: 3,
  },
  {
    name: "Premium Grilled Picanha",
    slug: "grilled-picanha-premium",
    category: "main",
    description: "Premium grilled picanha cooked to your preference.",
    priceCents: 1990,
    imageUrl: "images/dishes/grilled-picanha-premium.webp",
    sortOrder: 4,
  },
  {
    name: "Lemon Grilled Salmon",
    slug: "grilled-lemon-salmon",
    category: "main",
    description: "Grilled salmon with a fresh lemon flavour.",
    priceCents: 2090,
    imageUrl: "images/dishes/grilled-lemon-salmon.webp",
    sortOrder: 5,
  },
  {
    name: "Creamy Prawn Fettuccine",
    slug: "creamy-prawn-fettuccine",
    category: "main",
    description: "Creamy fettuccine with prawns.",
    priceCents: 1790,
    imageUrl: "images/dishes/creamy-prawn-fettuccine.webp",
    sortOrder: 6,
  },
  {
    name: "House Premium Soda",
    slug: "house-premium-soda",
    category: "drink",
    description: "Refreshing premium house soda.",
    priceCents: 390,
    imageUrl: "images/drinks/house-premium-soda.webp",
    sortOrder: 1,
  },
  {
    name: "Specialty Coffee",
    slug: "specialty-coffee",
    category: "drink",
    description: "Freshly prepared specialty coffee.",
    priceCents: 290,
    imageUrl: "images/drinks/specialty-coffee.webp",
    sortOrder: 2,
  },
  {
    name: "Fresh Lemonade",
    slug: "fresh-lemonade",
    category: "drink",
    description: "Fresh lemonade.",
    priceCents: 450,
    imageUrl: "images/drinks/fresh-lemonade.webp",
    sortOrder: 3,
  },
  {
    name: "Strawberry Supreme Tart",
    slug: "strawberry-supreme-tart",
    category: "dessert",
    description: "Strawberry tart for a sweet finish.",
    priceCents: 790,
    imageUrl: "images/desserts/strawberry-supreme-tart.webp",
    sortOrder: 1,
  },
  {
    name: "Dark Chocolate Mousse",
    slug: "dark-chocolate-mousse",
    category: "dessert",
    description: "Rich dark chocolate mousse.",
    priceCents: 650,
    imageUrl: "images/desserts/dark-chocolate-mousse.webp",
    sortOrder: 2,
  },
  {
    name: "Red Berry Cheesecake",
    slug: "red-berry-cheesecake",
    category: "dessert",
    description: "Cheesecake with red berries.",
    priceCents: 850,
    imageUrl: "images/desserts/red-berry-cheesecake.webp",
    sortOrder: 3,
  },
];

async function main() {
  const restaurant = await prisma.restaurant.findUnique({
    where: { id: restaurantId },
  });

  if (!restaurant) {
    throw new Error(
      `Restaurant "${restaurantId}" was not found. No catalog data was imported.`,
    );
  }

  const categoryIds = new Map<string, string>();

  for (const category of categories) {
    const saved = await prisma.category.upsert({
      where: {
        restaurantId_slug: {
          restaurantId,
          slug: category.slug,
        },
      },
      update: {
        name: category.name,
        sortOrder: category.sortOrder,
        isActive: true,
      },
      create: {
        restaurantId,
        name: category.name,
        slug: category.slug,
        sortOrder: category.sortOrder,
      },
    });

    categoryIds.set(category.slug, saved.id);
  }

  for (const product of products) {
    const categoryId = categoryIds.get(product.category);

    if (!categoryId) {
      throw new Error(`Category not found for ${product.name}`);
    }

    await prisma.product.upsert({
      where: {
        restaurantId_slug: {
          restaurantId,
          slug: product.slug,
        },
      },
      update: {
        name: product.name,
        description: product.description,
        priceCents: product.priceCents,
        imageUrl: product.imageUrl,
        categoryId,
        sortOrder: product.sortOrder,
        isActive: true,
      },
      create: {
        restaurantId,
        categoryId,
        name: product.name,
        slug: product.slug,
        description: product.description,
        priceCents: product.priceCents,
        imageUrl: product.imageUrl,
        type: ProductType.STANDARD,
        sortOrder: product.sortOrder,
        isActive: true,
        isAvailable: true,
      },
    });
  }

  console.log(`Catalog imported: ${categories.length} categories, ${products.length} products.`);
}

main()
  .catch((error) => {
    console.error("Catalog import failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
