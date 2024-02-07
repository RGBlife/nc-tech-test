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
