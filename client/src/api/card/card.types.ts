export type CardData = {
  id: number;
  allPrice: number;
  items?: {
    id: string;
    title: string;
    size: string;
    taste: string;
    price: string;
    count: string;
  }[];
};
