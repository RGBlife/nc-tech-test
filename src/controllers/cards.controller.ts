import { Request, Response } from "express";
import { fetchCards } from "../models/cards.model";

export const getCards = async (req: Request, res: Response) => {
  try {
    const cards = await fetchCards();
    res.status(200).send(cards);
  } catch (error) {
    console.log(error);
  }
};
