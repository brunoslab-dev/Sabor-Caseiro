import { describe, expect, it } from "vitest";
import { buildApp } from "../app.js";

describe("PATCH /api/reservations/:id/status", () => {
  it("allows an authenticated admin to update reservation status", async () => {
    const app = buildApp();

    const createResponse = await app.inject({
      method: "POST",
      url: "/api/reservations",
      payload: {
        name: "Teste Status",
        email: "teste-status@saborcaseiro.test",
        date: "2099-12-31",
        time: "12:00",
        guests: 2,
        message: "Reservation created by automated test.",
      },
    });

    expect(createResponse.statusCode).toBe(201);

    const createdReservation = createResponse.json().reservation;

    expect(createdReservation.id).toEqual(expect.any(String));

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

    const updateResponse = await app.inject({
      method: "PATCH",
      url: `/api/reservations/${createdReservation.id}/status`,
      headers: {
        authorization: `Bearer ${token}`,
      },
      payload: {
        status: "CONFIRMED",
      },
    });

    expect(updateResponse.statusCode).toBe(200);
    expect(updateResponse.json().reservation).toMatchObject({
      id: createdReservation.id,
      status: "CONFIRMED",
    });

    await app.close();
  });
});
