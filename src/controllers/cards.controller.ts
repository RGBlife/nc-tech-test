import { Request, Response } from "express";
import { fetchCardById, fetchCards } from "../models/cards.model";

export const getCards = async (req: Request, res: Response) => {
  try {
    const cards = await fetchCards();
    res.status(200).send(cards);
  } catch (error) {
    console.log(error);
  }
};

export const getCardById = async (req: Request, res: Response) => {
  try {
    const { cardId } = req.params;
    const card = await fetchCardById(cardId);
    res.status(200).send(card);
  } catch (error) {
    console.log(error);
  }
};
