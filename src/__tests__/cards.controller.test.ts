import * as request from "supertest";
import { app } from "../server";
import { readFile, writeFile } from "fs/promises";

type Posted = {
  title?: string;
  sizes: string[];
  basePrice: number;
  pages: {
    title: string;
    templateId: string;
  }[];
};

const posted: Posted = {
  title: "example title",
  sizes: ["sm", "md", "gt"],
  basePrice: 200,
  pages: [
    {
      title: "Front Cover",
      templateId: "template001",
    },
    {
      title: "Inside Left",
      templateId: "template002",
    },
    {
      title: "Inside Right",
      templateId: "template003",
    },
    {
      title: "Back Cover",
      templateId: "template004",
    },
  ],
};

let initialCards: string;

const fetchCards = async () => {
  initialCards = await readFile(`${__dirname}/../data/cards.json`, "utf8");
};

fetchCards();

afterEach(async () => {
  await writeFile(`${__dirname}/../data/cards.json`, initialCards);
});

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
        card_id: expect.stringMatching(/^card\d+$/),
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

describe("POST /cards", () => {

  test("returns 201 status and inserted card should match object structure with an card ID", async () => {
    const response = await request(app).post("/cards").send(posted).expect(201);

    expect(response.body).toEqual(
      expect.objectContaining({
        title: expect.any(String),
        imageUrl: expect.any(String),
        card_id: expect.stringMatching(/^card\d+$/),
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

  test("returns 400 for invalid request body", async () => {
    const invalidPosted = { ...posted, titl: "example title" };
    delete invalidPosted.title;

    const response = await request(app)
      .post("/cards")
      .send(invalidPosted)
      .expect(400);

    expect(response.body).toEqual(
      expect.objectContaining({
        error: "Invalid request body",
      })
    );
  });
});

describe("DELETE /cards/:cardId", () => {
  test("returns 204 status for succesfully deleting the card", async () => {
    const response = await request(app).post("/cards").send(posted).expect(201);    
    await request(app).delete("/cards/card004").expect(204);
  });
  test("returns 404 status if the card id doesn't exist", async () => {
    await request(app).delete("/cards/invalid").expect(404);
  });
});