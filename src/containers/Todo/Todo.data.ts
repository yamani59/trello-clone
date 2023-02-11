export interface CardType {
  id: string | number;
  name: string;
  label?: string;
}

export interface BoardType {
  id: string;
  name: string;
  cards: CardType[];
}
