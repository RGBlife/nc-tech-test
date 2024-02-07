import * as request from "supertest";
import { app } from "../server";

describe("GET /cards", () => {
  test("returns an array of cards in the desired format", async () => {
    const response = await request(app).get("/cards").expect(200);
    expect(response.body).toEqual(
      expect.objectContaining([
        {
          title: expect.any(String),
          imageUrl: expect.any(String),
          card_id: expect.any(String),
        },
      ])
    );
    expect(response.body.length).toBeGreaterThan(0);
  });
});

describe("GET /cards/cardId", () => {
  test("successfully returns card", async () => {
    const response = await request(app).get("/cards/card001").expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        title: expect.any(String),
        imageUrl: expect.any(String),
        card_id: expect.any(String),
        base_price: expect.any(Number),
        available_sizes: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            title: expect.any(String),
          }),
        ]),
        pages: expect.arrayContaining([
          expect.objectContaining({
            title: expect.any(String),
            templateId: expect.any(String),
          }),
        ]),
      })
    );
  });
  test("returns 404 for non existent card ID", async () => {
    const response = await request(app).get("/cards/invalidID").expect(404);

    expect(response.body).toEqual(
      expect.objectContaining({
        error: expect.any(String),
      })
    );
  });
});
