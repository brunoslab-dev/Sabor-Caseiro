import { describe, expect, it } from "vitest";
import { buildApp } from "../app.js";

describe("POST /api/auth/login", () => {
  it("rejects invalid credentials", async () => {
    const app = buildApp();

    const response = await app.inject({
      method: "POST",
      url: "/api/auth/login",
      payload: {
        email: "admin@saborcaseiro.test",
        password: "senha-incorreta",
      },
    });

    expect(response.statusCode).toBe(401);
    expect(response.json()).toMatchObject({
      error: "INVALID_CREDENTIALS",
      message: "Invalid email or password.",
    });

    await app.close();
  });
});
