export interface CardType {
  id: string | number;
  board_id: string | number;
  name: string;
  label?: string;
}

export interface BoardType {
  id: string | number;
  name: string;
  cards: CardType[];
}
