import { readFile, writeFile } from "fs/promises";
import { fetchImageUrlById } from "./templates.model";
import { formatSizes } from "../utils/formatSizes";
import { EndpointError, ErrorType } from "../middleware/errors";

type Card = {
  id: string;
  title: string;
  sizes: string[];
  basePrice: number;
  pages: CardPage[];
};

type CardByIdResponse = {
  title: string;
  imageUrl: string;
  card_id: string;
  base_price: number;
  available_sizes: AvailableSize[];
  pages: CardPage[];
};

type CardResponse = {
  title: string;
  imageUrl: string;
  card_id: string;
};

type CardPage = {
  title: string;
  templateId: string;
};

export type AvailableSize = {
  id: string;
  title: string;
};

type CardPostRequest = {
  title: string;
  sizes: string[];
  basePrice: number;
  pages: CardPage[];
};

const readCards = async () => {
  return JSON.parse(
    await readFile(`${__dirname}/../data/cards.json`, "utf8")
  ) as Card[];
};

export const fetchCards = async (): Promise<CardResponse[]> => {
  const cards = await readCards();
  return cards.map((card) => {
    return {
      title: card.title,
      imageUrl: fetchImageUrlById(card.pages[0].templateId),
      card_id: card.id,
    };
  });
};

export const fetchCardById = async (id: string): Promise<CardByIdResponse> => {
  const cards = await readCards();  
  const found = cards.find((card) => card.id === id);
  if (found) {
    return {
      title: found.title,
      imageUrl: fetchImageUrlById(found.pages[0].templateId),
      card_id: found.id,
      base_price: found.basePrice,
      available_sizes: formatSizes(found.sizes),
      pages: found.pages,
    };
  }
  throw new EndpointError(`Card ${id} not found.`, ErrorType.NotFound);
};

export const insertCard = async (resCard: CardPostRequest): Promise<CardByIdResponse> => {
  const cards = await readCards();

  const newIdNumber = String(Number(cards[cards.length - 1].id.substring(4)) + 1).padStart(
    3,
    "0"
  );

  const newCard = {
    title: resCard.title,
    imageUrl: fetchImageUrlById(resCard.pages[0].templateId),
    card_id: "card" + newIdNumber,
    base_price: resCard.basePrice,
    available_sizes: formatSizes(resCard.sizes),
    pages: resCard.pages,
  };
  cards.push({ id: "card" + newIdNumber, ...resCard });
  await writeFile(`${__dirname}/../data/cards.json`, JSON.stringify(cards, null, 2));
  return newCard;
};

export const removeCardById = async (id: string) => {
    const cards = await readCards();
    const cardRemoved = cards.filter((card) => card.id !== id);
    await writeFile(`${__dirname}/../data/cards.json`, JSON.stringify(cardRemoved, null, 2));
    return;
  };