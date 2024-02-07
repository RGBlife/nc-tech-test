import { readFileSync } from "fs";
import { fetchImageUrlById } from "./templates.model";

type CardResponse = {
    title: string;
    imageUrl: string;
    card_id: string;
}

type Card = {
    id: string;
    title: string;
    sizes: string[],
    basePrice: number,
    pages: CardPage[]

}

type CardPage = {
    title: string,
    templateId: string,
}

export const fetchCards = async (): Promise<CardResponse[]> => {
    const cards = JSON.parse(readFileSync(`${__dirname}/../data/cards.json`, "utf8")) as Card[]
    return cards.map(card => {
        return {
            title: card.title,
            imageUrl: fetchImageUrlById(card.pages[0].templateId),
            card_id: card.id
        }
    })
}