import type { FastifyInstance } from "fastify";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma.js";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function authRoutes(app: FastifyInstance) {
  app.post(
    "/api/auth/login",
    {
      config: {
        rateLimit: {
          max: 5,
          timeWindow: "1 minute",
        },
      },
    },
    async (request, reply) => {
    const result = loginSchema.safeParse(request.body);

    if (!result.success) {
      return reply.code(400).send({
        error: "VALIDATION_ERROR",
        message: "Invalid email or password.",
      });
    }

    const { email, password } = result.data;

    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      return reply.code(401).send({
        error: "INVALID_CREDENTIALS",
        message: "Invalid email or password.",
      });
    }

    const passwordMatches = await bcrypt.compare(
      password,
      admin.passwordHash
    );

    if (!passwordMatches) {
      return reply.code(401).send({
        error: "INVALID_CREDENTIALS",
        message: "Invalid email or password.",
      });
    }

    const token = await app.jwt.sign({
      sub: admin.id,
      email: admin.email,
    });

    return reply.send({
      message: "Login successful.",
      token,
      admin: {
        id: admin.id,
        email: admin.email,
      },
    });
  });
}
