
import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";

const RESTAURANT_ID = "sabor-caseiro-main";

const orderSchema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(5).max(30),
  fulfillment: z.enum(["pickup", "delivery"]),
  address: z.string().trim().max(300).optional(),
  notes: z.string().trim().max(1000).optional(),
  items: z.array(
    z.object({
      productId: z.string().min(1),
      quantity: z.number().int().min(1).max(20),
      optionIds: z.array(z.string().min(1)).max(20).default([]),
    })
  ).min(1).max(50),
});

export async function orderRoutes(app: FastifyInstance) {
  app.post("/api/orders", async (request, reply) => {
    const parsed = orderSchema.safeParse(request.body);

    if (!parsed.success) {
      return reply.code(400).send({
        error: "VALIDATION_ERROR",
        message: "Please check the order details.",
        details: parsed.error.flatten().fieldErrors,
      });
    }

    const data = parsed.data;
    const fulfillmentType =
      data.fulfillment === "delivery" ? "DELIVERY" : "PICKUP";

    const restaurant = await prisma.restaurant.findUnique({
      where: { id: RESTAURANT_ID },
    });

    if (!restaurant || !restaurant.isOpen) {
      return reply.code(409).send({
        error: "RESTAURANT_UNAVAILABLE",
        message: "The restaurant is currently unavailable.",
      });
    }

    if (
      fulfillmentType === "PICKUP" && !restaurant.acceptsPickup ||
      fulfillmentType === "DELIVERY" && !restaurant.acceptsDelivery
    ) {
      return reply.code(409).send({
        error: "FULFILLMENT_UNAVAILABLE",
        message: "This order method is not currently available.",
      });
    }

    if (
      fulfillmentType === "DELIVERY" &&
      (!data.address || data.address.trim().length < 5)
    ) {
      return reply.code(400).send({
        error: "ADDRESS_REQUIRED",
        message: "A delivery address is required.",
      });
    }

    const productIds = [...new Set(data.items.map(item => item.productId))];

    const products = await prisma.product.findMany({
      where: {
        id: { in: productIds },
        restaurantId: RESTAURANT_ID,
        isActive: true,
        isAvailable: true,
      },
      include: {
        modifierGroups: {
          include: {
            group: {
              include: {
                options: {
                  where: { isAvailable: true },
                },
              },
            },
          },
        },
      },
    });

    if (products.length !== productIds.length) {
      return reply.code(400).send({
        error: "INVALID_PRODUCT",
        message: "One or more products are unavailable.",
      });
    }

    const productMap = new Map(products.map(product => [product.id, product]));
    const orderItems: {
      productId: string;
      productName: string;
      unitPriceCents: number;
      quantity: number;
      lineTotalCents: number;
      selectedOptions: { id: string; name: string; priceDeltaCents: number }[];
    }[] = [];

    let subtotalCents = 0;

    for (const item of data.items) {
      const product = productMap.get(item.productId)!;

      if (new Set(item.optionIds).size !== item.optionIds.length) {
        return reply.code(400).send({
          error: "DUPLICATE_OPTION",
          message: `Duplicate options for ${product.name}.`,
        });
      }

      const groups = product.modifierGroups
        .filter(link => link.group.isActive)
        .map(link => link.group);

      const selections = groups.map(group => ({
        group,
        options: group.options.filter(option =>
          item.optionIds.includes(option.id)
        ),
      }));

      for (const selection of selections) {
        const { group, options } = selection;

        if (options.some(option => !option.isAvailable)) {
          return reply.code(400).send({
            error: "INVALID_OPTION",
            message: "One or more options are unavailable.",
          });
        }

        const count = options.length;

        if (
          count < group.minSelections ||
          count > group.maxSelections
        ) {
          return reply.code(400).send({
            error: "INVALID_SELECTION_COUNT",
            message: `Please check the options for ${product.name}.`,
          });
        }
      }

      const allowedOptionIds = new Set(
        selections.flatMap(selection =>
          selection.options.map(option => option.id)
        )
      );

      if (item.optionIds.some(id => !allowedOptionIds.has(id))) {
        return reply.code(400).send({
          error: "INVALID_OPTION",
          message: `An option does not belong to ${product.name}.`,
        });
      }

      const selectedOptions = selections.flatMap(selection =>
        selection.options.map(option => ({
          id: option.id,
          name: option.name,
          priceDeltaCents: option.priceDeltaCents,
        }))
      );

      const unitPriceCents = product.priceCents +
        selectedOptions.reduce(
          (sum, option) => sum + option.priceDeltaCents,
          0
        );

      const lineTotalCents = unitPriceCents * item.quantity;
      subtotalCents += lineTotalCents;

      orderItems.push({
        productId: product.id,
        productName: product.name,
        unitPriceCents,
        quantity: item.quantity,
        lineTotalCents,
        selectedOptions,
      });
    }

    if (subtotalCents < restaurant.minimumOrderCents) {
      return reply.code(400).send({
        error: "MINIMUM_ORDER_NOT_MET",
        message: "The minimum order amount has not been met.",
      });
    }

    const deliveryFeeCents =
      fulfillmentType === "DELIVERY" ? restaurant.deliveryFeeCents : 0;

    const order = await prisma.order.create({
      data: {
        restaurantId: restaurant.id,
        customerName: data.name,
        customerPhone: data.phone,
        deliveryAddress:
          fulfillmentType === "DELIVERY" ? data.address : null,
        customerNotes: data.notes || null,
        fulfillmentType,
        paymentMethod: "CASH",
        paymentStatus: "PENDING",
        status: "PENDING",
        subtotalCents,
        deliveryFeeCents,
        totalCents: subtotalCents + deliveryFeeCents,
        items: {
          create: orderItems,
        },
      },
      select: {
        id: true,
        orderNumber: true,
        status: true,
        fulfillmentType: true,
        subtotalCents: true,
        deliveryFeeCents: true,
        totalCents: true,
        createdAt: true,
        items: {
          select: {
            productName: true,
            quantity: true,
            unitPriceCents: true,
            lineTotalCents: true,
            selectedOptions: true,
          },
        },
      },
    });

    return reply.code(201).send({
      message: "Order received successfully.",
      order,
    });
  });
}
