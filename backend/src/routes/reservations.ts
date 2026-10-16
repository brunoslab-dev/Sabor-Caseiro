import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { authenticate } from "../middleware/authenticate.js";

const reservationSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(160),
  date: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .refine(
      (value) => value >= new Date().toISOString().slice(0, 10),
      "Date cannot be in the past"
    ),
  time: z
    .string()
    .trim()
    .regex(/^([01]\d|2[0-3]):[0-5]\d$/)
    .optional()
    .or(z.literal("")),
  guests: z.coerce.number().int().min(1).max(20),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

export async function reservationRoutes(app: FastifyInstance) {
  const statusSchema = z.object({
    status: z.enum(["PENDING", "CONFIRMED", "CANCELLED"]),
  });

  app.get("/api/reservations", { preHandler: authenticate }, async (_request, reply) => {
    const reservations = await prisma.reservation.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        email: true,
        date: true,
        time: true,
        guests: true,
        message: true,
        status: true,
        createdAt: true,
      },
    });

    return reply.send({ reservations });
  });

  app.patch("/api/reservations/:id/status", { preHandler: authenticate }, async (request, reply) => {
    const params = z.object({
      id: z.string().min(1),
    }).safeParse(request.params);

    if (!params.success) {
      return reply.code(400).send({
        error: "VALIDATION_ERROR",
        message: "Invalid reservation ID.",
      });
    }

    const result = statusSchema.safeParse(request.body);

    if (!result.success) {
      return reply.code(400).send({
        error: "VALIDATION_ERROR",
        message: "Invalid reservation status.",
        details: result.error.flatten().fieldErrors,
      });
    }

    const reservation = await prisma.reservation.update({
      where: {
        id: params.data.id,
      },
      data: {
        status: result.data.status,
      },
      select: {
        id: true,
        name: true,
        email: true,
        date: true,
        time: true,
        guests: true,
        message: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return reply.send({
      message: "Reservation status updated.",
      reservation,
    });
  });

  app.delete("/api/reservations/:id", { preHandler: authenticate }, async (request, reply) => {
    const params = z.object({
      id: z.string().min(1),
    }).safeParse(request.params);

    if (!params.success) {
      return reply.code(400).send({
        error: "VALIDATION_ERROR",
        message: "Invalid reservation ID.",
      });
    }

    const reservation = await prisma.reservation.delete({
      where: {
        id: params.data.id,
      },
      select: {
        id: true,
        name: true,
        status: true,
      },
    });

    return reply.send({
      message: "Reservation deleted.",
      reservation,
    });
  });

  app.post("/api/reservations", async (request, reply) => {
    const result = reservationSchema.safeParse(request.body);

    if (!result.success) {
      return reply.code(400).send({
        error: "VALIDATION_ERROR",
        message: "Please check the reservation fields.",
        details: result.error.flatten().fieldErrors,
      });
    }

    const data = result.data;

    const reservation = await prisma.reservation.create({
      data: {
        name: data.name,
        email: data.email,
        date: new Date(`${data.date}T00:00:00.000Z`),
        time: data.time || null,
        guests: data.guests,
        message: data.message || null,
      },
      select: {
        id: true,
        name: true,
        date: true,
        time: true,
        guests: true,
        status: true,
        createdAt: true,
      },
    });

    return reply.code(201).send({
      message: "Reservation request received.",
      reservation,
    });
  });
}


