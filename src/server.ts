import * as express from "express";
import { getCardById, getCards } from "./controllers/cards.controller";

export const app = express()

app.set('json spaces', 2);

app.get('/cards', getCards)

app.get('/cards/:cardId/:sizeId?', getCardById)
