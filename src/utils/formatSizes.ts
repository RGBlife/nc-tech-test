import { AvailableSize } from "../models/cards.model";

type SizeValues = {
  [key: string]: AvailableSize;
};

const sizeValues: SizeValues = {
  sm: { id: "sm", title: "Small" },
  md: { id: "md", title: "Medium" },
  lg: { id: "lg", title: "Large" },
  gt: { id: "gt", title: "Giant" },
};

export const formatSizes = (sizes: string[]): AvailableSize[] => {
  return sizes.map((size) => sizeValues[size]);
};
