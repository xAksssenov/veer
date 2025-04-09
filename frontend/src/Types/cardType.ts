export interface Card {
  id: number;
  title: string;
  price: number;
  description: string;
  gender: string;
  image: string[];
}

export enum CardGender {
  UNISEX = "unisex",
}
