export interface CardType {
  id: string;
  name: string;
  label?: string;
}

export interface BoardType {
  id: string;
  name: string;
  cards: CardType[];
}
