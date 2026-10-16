import { describe, expect, it } from "vitest";
import { buildApp } from "../app.js";

describe("POST /api/reservations", () => {
  it("rejects invalid reservation data", async () => {
    const app = buildApp();

    const response = await app.inject({
      method: "POST",
      url: "/api/reservations",
      payload: {
        name: "",
        email: "email-invalido",
        guests: 0,
      },
    });

    expect(response.statusCode).toBe(400);
    expect(response.json()).toMatchObject({
      error: "VALIDATION_ERROR",
    });

    await app.close();
  });
});
