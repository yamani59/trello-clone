interface CardType {
  id: string | number;
  board_id: string | number;
  name: string;
  label?: string;
}

interface BoardType {
  id: string | number;
  name: string;
  cards: CardType[];
}

interface BoardProps {
  title: string;
  boardIndex: number;
  cards?: CardType[];
  cardHandler: (title: string) => void;
  cardDropHandler: (boardIndex: number, card: CardType) => void;
  titleChangeHandler: (boardIndex: number, title: string) => void;
}

interface OptionsProps {
  children: React.ReactNode
  x?: number,
  y?: number,
}