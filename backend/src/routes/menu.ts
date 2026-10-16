import type { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma.js";

export async function menuRoutes(app: FastifyInstance) {
  app.get("/api/menu", async (_request, reply) => {
    const restaurant = await prisma.restaurant.findUnique({
      where: { id: "sabor-caseiro-main" },
      select: {
        id: true,
        name: true,
        slug: true,
        currency: true,
        isOpen: true,
        acceptsPickup: true,
        acceptsDelivery: true,
        minimumOrderCents: true,
        deliveryFeeCents: true,
      },
    });

    if (!restaurant) {
      return reply.code(404).send({ error: "RESTAURANT_NOT_FOUND" });
    }

    const categories = await prisma.category.findMany({
      where: { restaurantId: restaurant.id, isActive: true },
      orderBy: { sortOrder: "asc" },
      include: {
        products: {
          where: { isActive: true, isAvailable: true },
          orderBy: { sortOrder: "asc" },
          include: {
            modifierGroups: {
              orderBy: { sortOrder: "asc" },
              include: {
                group: {
                  include: {
                    options: {
                      where: { isAvailable: true },
                      orderBy: { sortOrder: "asc" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    return {
      restaurant,
      categories: categories.map((category) => ({
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
        products: category.products.map((product) => ({
          id: product.id,
          name: product.name,
          slug: product.slug,
          description: product.description,
          imageUrl: product.imageUrl,
          priceCents: product.priceCents,
          type: product.type,
          modifierGroups: product.modifierGroups.map(({ group }) => ({
            id: group.id,
            name: group.name,
            minSelections: group.minSelections,
            maxSelections: group.maxSelections,
            isRequired: group.isRequired,
            options: group.options.map((option) => ({
              id: option.id,
              name: option.name,
              priceDeltaCents: option.priceDeltaCents,
              isDefault: option.isDefault,
            })),
          })),
        })),
      })),
    };
  });
}
