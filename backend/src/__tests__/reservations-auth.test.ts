import { describe, expect, it } from "vitest";
import { buildApp } from "../app.js";

describe("GET /api/reservations", () => {
  it("rejects unauthenticated requests", async () => {
    const app = buildApp();

    const response = await app.inject({
      method: "GET",
      url: "/api/reservations",
    });

    expect(response.statusCode).toBe(401);
    expect(response.json()).toMatchObject({
      error: "UNAUTHORIZED",
      message: "Authentication required.",
    });

    await app.close();
  });
});
