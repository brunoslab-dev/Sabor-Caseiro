import Fastify, { type FastifyError } from "fastify";
import cors from "@fastify/cors";
import sensible from "@fastify/sensible";
import jwt from "@fastify/jwt";
import rateLimit from "@fastify/rate-limit";
import { env } from "./env.js";
import { prisma } from "./lib/prisma.js";
import { authRoutes } from "./routes/auth.js";
import { healthRoutes } from "./routes/health.js";
import { menuRoutes } from "./routes/menu.js";
import { orderRoutes } from "./routes/orders.js";
import { reservationRoutes } from "./routes/reservations.js";

export function buildApp() {
  const app = Fastify({ logger: true });

  app.register(cors, {
    origin: env.CORS_ORIGIN,
    methods: ["GET", "POST", "PATCH", "DELETE"],
  });
  app.register(sensible);
  app.register(jwt, { secret: env.JWT_SECRET });
  app.register(rateLimit);

  app.register(healthRoutes);
  app.register(menuRoutes);
  app.register(orderRoutes);
  app.register(reservationRoutes);
  app.register(authRoutes);

  app.setErrorHandler((error: FastifyError, _request, reply) => {
    app.log.error(error);

    const statusCode =
      typeof error.statusCode === "number" && error.statusCode >= 400
        ? error.statusCode
        : 500;

    return reply.code(statusCode).send({
      error:
        statusCode === 429
          ? "RATE_LIMIT_EXCEEDED"
          : "INTERNAL_SERVER_ERROR",
      message:
        statusCode === 429
          ? "Too many requests. Please try again later."
          : "Something went wrong. Please try again later.",
    });
  });

  app.addHook("onClose", async () => {
    await prisma.$disconnect();
  });

  return app;
}
