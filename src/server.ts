import * as express from "express";
import { deleteCardById, getCardById, getCards, postCard } from "./controllers/cards.controller";
import { handleCustomErrors, handleServerErrors } from "./middleware/errors";

export const app = express();

app.use(express.json());

app.set("json spaces", 2);

app.get("/cards", getCards);

app.get("/cards/:cardId", getCardById);

app.post("/cards", postCard);

app.delete("/cards/:cardId", deleteCardById);

app.use(handleCustomErrors);
app.use(handleServerErrors);
