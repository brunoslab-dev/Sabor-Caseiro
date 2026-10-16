import type { FastifyInstance } from "fastify";
export async function healthRoutes(app: FastifyInstance) {
  app.get("/health", async () => ({ status: "ok", service: "sabor-caseiro-api", timestamp: new Date().toISOString() }));
}
