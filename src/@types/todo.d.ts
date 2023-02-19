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
  deleteHandler: (boardIndex: number) => void,
  deleteCardHandler: (boardIndex: number, cardIndex: number) => void
}

interface Cordinat {
  x?: number,
  y?: number,
}

interface OptionsProps extends Cordinat {
  children: React.ReactNode,
  className?: string,
  title?: string,
  closeHandler: () => void
}

interface test<T extends Cordinat> {
  date: T
}