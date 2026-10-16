import { describe, expect, it } from "vitest";
import { buildApp } from "../app.js";

describe("DELETE /api/reservations/:id", () => {
  it("allows an authenticated admin to delete a reservation", async () => {
    const app = buildApp();

    const createResponse = await app.inject({
      method: "POST",
      url: "/api/reservations",
      payload: {
        name: "Teste Delete",
        email: "teste-delete@saborcaseiro.test",
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

    const deleteResponse = await app.inject({
      method: "DELETE",
      url: `/api/reservations/${createdReservation.id}`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    expect(deleteResponse.statusCode).toBe(200);
    expect(deleteResponse.json().reservation).toMatchObject({
      id: createdReservation.id,
      name: "Teste Delete",
    });

    await app.close();
  });
});
