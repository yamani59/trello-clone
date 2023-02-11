import React, { useState, useRef, type SetStateAction } from "react";
import { type CardType } from "./Todo.data";
import { AiOutlineClose, AiOutlineMore } from "react-icons/ai";
import FormInput from "@/components/FormInput/Index";

interface BoardProps {
  title: string;
  boardIndex: number;
  cards?: CardType[];
  cardHandler: (title: string) => void;
  cardDropHandler: (boardIndex: number, card: CardType) => void;
}

const Board = ({ cards, title, boardIndex, cardHandler, cardDropHandler }: BoardProps) => {
  const [showTextArea, setShowTextArea] = useState<boolean>(false);
  const [cardTitle, setCardTitle] = useState<string>('');
  const AddCard = useRef<HTMLElement>(null);

  const addCard = () => {
    cardHandler(cardTitle);
    showAddCard();
  };

  const showAddCard = () => {
    AddCard.current?.classList.toggle('hidden');
    setShowTextArea(!showTextArea);
  };

  const onDragOverHandler = (e: React.DragEvent, data: CardType) => {
    const target = e.target as Element
    e.dataTransfer.setData(
      'text/plain', 
      JSON.stringify({...data, board_id: boardIndex})
    )
    target.classList?.add('opacity-50')
    target.classList?.add('border-2')
  }

  const onDragEndHandler = (e: React.DragEvent) => {
    const target = e.target as Element
    target.classList.remove('opacity-50')
    target.classList.remove('border-2')
  }

  return (
    <div className="w-[250px] min-w-[250px] mr-3 rounded-sm p-2 bg-[#ebecf0]">
      <div className="flex align-middle justify-between mx-1 w-100">
        <span className="font-medium">{title}</span>
        <AiOutlineMore className="ckeyursor-pointer mt-1" />
      </div>

      <div onDrop={(e) => {
        cardDropHandler(boardIndex, JSON.parse(e.dataTransfer.getData('text')))
      }}>
        {cards?.map((data, index) => (
          <div
            className="p-2 bg-white rounded-sm my-2 cursor-pointer shadow-sm text-xs dra"
            key={index}
            draggable
            onDragStart={(e) => onDragOverHandler(e, data)}
            onDragOver={(e) => e.preventDefault()}
            onDragEnd={onDragEndHandler}
          >
            {data.name}
          </div>
        ))}
      </div>

      {showTextArea && (
        <div>
          <FormInput.TextArea
            className="focus:outline-none"
            inputHandler={(data: SetStateAction<string>) => setCardTitle(data)}
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

export default Board;