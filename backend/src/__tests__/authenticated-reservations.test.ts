import { describe, expect, it } from "vitest";
import { buildApp } from "../app.js";

describe("Authenticated reservations", () => {
  it("allows an authenticated admin to list reservations", async () => {
    const app = buildApp();

    const loginResponse = await app.inject({
      method: "POST",
      url: "/api/auth/login",
      payload: {
        email: "admin@saborcaseiro.test",
        password: "SaborCaseiro-Admin-2026!",
      },
    });

    expect(loginResponse.statusCode).toBe(200);

    const { token } = loginResponse.json();

    const response = await app.inject({
      method: "GET",
      url: "/api/reservations",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toHaveProperty("reservations");
    expect(Array.isArray(response.json().reservations)).toBe(true);

    await app.close();
  });
});
