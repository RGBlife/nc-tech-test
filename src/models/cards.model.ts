import { readFile } from "fs/promises";
import { fetchImageUrlById } from "./templates.model";
import { formatSizes } from "../utils/formatSizes";

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
  throw { message: `Card ${id} not found.`, status: 404 };
};
