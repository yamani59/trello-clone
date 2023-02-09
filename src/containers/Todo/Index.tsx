import { useRef, useState } from 'react';
import { AiOutlineMore, AiOutlineClose } from 'react-icons/ai';
import FormInput from '@/components/FormInput/Index';
import { BoardType, CardType } from './Todo.data';

interface BoardProps {
  title: string;
  cards?: CardType[];
  cardHandler: (title: string) => void;
}

const Board = ({ cards, title, cardHandler }: BoardProps) => {
  const [showTextArea, setShowTextArea] = useState<boolean>(false);
  const [cardTitle, setCardTitle] = useState<string>('');
  const AddCard = useRef<HTMLElement>(null);

  function addCard() {
    cardHandler(cardTitle);
    showAddCard();
  }

  function showAddCard() {
    AddCard.current?.classList.toggle('hidden');
    setShowTextArea(!showTextArea);
  }

  return (
    <div className="w-[250px] min-w-[250px] mx-3 rounded-sm p-2 bg-[#ebecf0]">
      <div className="flex align-middle justify-between mx-1 w-100">
        <span className="font-medium">{title}</span>
        <AiOutlineMore className="cursor-pointer mt-1" />
      </div>

      {cards?.map((data, index) => (
        <div
          className="p-2 bg-white rounded-sm my-2 cursor-pointer shadow-sm text-xs"
          key={index}
          draggable
        >
          {data.name}
        </div>
      ))}

      {showTextArea && (
        <div>
          <FormInput.TextArea
            className="focus:outline-none"
            inputHandler={(data) => setCardTitle(data)}
          />
          <div className="flex items-center">
            <button
              onClick={addCard}
              className="bg-blue-500 text-white py-1 px-2 font-light text-md rounded-sm hover:bg-blue-400"
            >
              Tambah
            </button>
            <AiOutlineClose
              onClick={showAddCard}
              className="cursor-pointer ml-3 text-xl text-gray-500"
            />
          </div>
        </div>
      )}

      <div
        ref={AddCard as React.RefObject<HTMLDivElement>}
        onClick={showAddCard}
        className="flex cursor-pointer text-gray-500 hover:bg-slate-300 ease-in duration-100 p-1"
      >
        + Add a Card
      </div>
    </div>
  );
};

const Todo = () => {
  const AddBoard = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState<string>('');
  const [boards, setBoards] = useState<BoardType[]>([]);
  let boardsComponent = [] as React.ReactNode;

  boardsComponent = boards.map((board, idx) => (
    <Board
      cardHandler={(title) => {
        boards[idx].cards?.push({ id: '1', name: title });
        console.log(boards[idx]);
      }}
      cards={board.cards}
      title={board.name}
      key={idx}
    />
  ));

  function addBoard() {
    showHandlerBoard();
    setBoards([
      ...boards,
      {
        id: '1',
        name: title,
        cards: [],
      },
    ]);
  }

  function showHandlerBoard() {
    AddBoard.current?.classList.toggle('hidden');
  }

  return (
    <div className="w-100 h-[100vh] bg-gray-500 flex flex-nowrap overflow-x-auto items-start p-5">
      {boardsComponent}
      <div className="relative w-[250px]">
        <div
          onClick={showHandlerBoard}
          className="p-2 bg-gray-400 absolute bg-opacity-20 text-white cursor-pointer rounded-sm w-[250px] hover:bg-opacity-30"
        >
          + Tambah List Lain
        </div>
        <div
          ref={AddBoard}
          className="absolute animate-downShow hidden bg-[#ebecf0] w-[250px] h-[110px] p-3 rounded-sm overflow-hidden"
        >
          <FormInput.Text
            placeholder="Masukan board..."
            className="outline-none border-2 border-sky-700 scroll-m-0"
            inputHandler={(e) => {
              setTitle(e.target.value);
            }}
          ></FormInput.Text>
          <div className="flex items-center">
            <button
              onClick={addBoard}
              className="bg-blue-500 text-white mt-3 py-1 px-2 font-light text-md rounded-sm hover:bg-blue-400"
            >
              Tambah
            </button>
            <AiOutlineClose
              onClick={showHandlerBoard}
              className="cursor-pointer ml-3 mt-3 text-xl text-gray-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
