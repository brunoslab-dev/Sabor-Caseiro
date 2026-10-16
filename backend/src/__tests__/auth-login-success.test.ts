import { describe, expect, it } from "vitest";
import { buildApp } from "../app.js";

describe("POST /api/auth/login", () => {
  it("authenticates a valid admin", async () => {
    const app = buildApp();

    const response = await app.inject({
      method: "POST",
      url: "/api/auth/login",
      payload: {
        email: "admin@saborcaseiro.test",
        password: "SaborCaseiro-Admin-2026!",
      },
    });

    expect(response.statusCode).toBe(200);

    const body = response.json();

    expect(body.message).toBe("Login successful.");
    expect(body.token).toEqual(expect.any(String));
    expect(body.token.length).toBeGreaterThan(0);
    expect(body.admin).toMatchObject({
      email: "admin@saborcaseiro.test",
    });

    await app.close();
  });
});
