import { Request, Response, NextFunction } from "express";
import { fetchCardById, fetchCards, insertCard, removeCardById } from "../models/cards.model";
import { EndpointError, ErrorType } from "../middleware/errors";

export const getCards = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cards = await fetchCards();
    res.status(200).send(cards);
  } catch (err) {
    next(err);
  }
};

export const getCardById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cardId } = req.params;
    const card = await fetchCardById(cardId);
    res.status(200).send(card);
  } catch (err) {
    next(err);
  }
};

export const postCard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, sizes, basePrice, pages } = req.body;

    if (
      !title ||
      !sizes ||
      !basePrice ||
      !pages ||
      Object.entries(req.body).length > 4
    ) {
      throw new EndpointError("Invalid request body", ErrorType.BadRequest);
    }

    const result = await insertCard(req.body);
    res.status(201).send(result);
  } catch (err) {
    next(err);
  }
};

export const deleteCardById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {    
    const { cardId } = req.params;
    
    await fetchCardById(cardId);
    await removeCardById(cardId);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
