import { readFileSync } from "fs";

type Template = {
  id: string;
  width: number;
  height: number;
  imageUrl: string;
};

const templates: Template[] = JSON.parse(
  readFileSync(`${__dirname}/../data/templates.json`, "utf8")
);

export const fetchImageUrlById = (cardId: string): string => {
  const templateFound = templates.find((template) => template.id === cardId);
  if (!templateFound) {
    throw { message: "Template not found.", status: 404 };
  }
  return templateFound.imageUrl;
};
