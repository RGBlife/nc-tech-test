import { Request, Response, NextFunction } from "express";
import { fetchCardById, fetchCards } from "../models/cards.model";

export const getCards = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cards = await fetchCards();
    res.status(200).send(cards);
  } catch (err) {
    next(err)
  }
};

export const getCardById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { cardId } = req.params;
    const card = await fetchCardById(cardId);
    res.status(200).send(card);
  } catch (err) {
    next(err)
  }
};
