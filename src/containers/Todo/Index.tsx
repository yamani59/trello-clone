import { useRef, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import FormInput from '@/components/FormInput/Index';
import Board from './Board';

const Todo = () => {
  const AddBoard = useRef<HTMLDivElement>(null);
  const [title, setTitle] = useState<string>('');
  const [boards, setBoards] = useState<BoardType[]>([]);
  let boardsComponent = [] as React.ReactNode;

  boardsComponent = boards.map((board, idx) => (
    <Board
      titleChangeHandler={(boardIndex, title) => {
        boards[boardIndex].name = title;
        setBoards(boards.map((data) => data));
      }}
      cardHandler={(title) => {
        boards[idx].cards?.push({
          id: new Date().getTime(),
          board_id: idx + 1,
          name: title,
        });
      }}
      cardDropHandler={(boardIndex, card) => {
        boards[(card.board_id as number) - 1].cards = boards[
          (card.board_id as number) - 1
        ].cards?.filter((data) => {
          return data.id !== card.id;
        });
        card.board_id = boardIndex + 1;
        boards[boardIndex].cards.push(card);
        setBoards(boards.map((data) => data));
      }}
      cards={board.cards}
      title={board.name}
      boardIndex={idx}
      key={idx}
    />
  ));

  function addBoard() {
    showHandlerBoard();
    setBoards([
      ...boards,
      {
        id: boards.length + 1,
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
