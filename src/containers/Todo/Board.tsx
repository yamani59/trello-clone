import React, { useState, useRef, type SetStateAction } from 'react';
import { AiOutlineClose, AiOutlineMore } from 'react-icons/ai';
import FormInput from '@/components/FormInput/Index';
import Options from './Options';

const Board = ({
  cards,
  title,
  boardIndex,
  cardHandler,
  cardDropHandler,
  titleChangeHandler,
}: BoardProps) => {
  const [showTextArea, setShowTextArea] = useState<boolean>(false);
  const [cardTitle, setCardTitle] = useState<string>('');
  const AddCard = useRef<HTMLElement>(null);
  const [showTitleUpdate, setShowTitleUpdate] = useState<boolean>(false);
  const [showOptions, setShowOptios] = useState<boolean>(false);

  const addCard = () => {
    cardHandler(cardTitle);
    showAddCard();
  };

  const showAddCard = () => {
    AddCard.current?.classList.toggle('hidden');
    setShowTextArea(!showTextArea);
  };

  const onDragOverHandler = (e: React.DragEvent, data: CardType) => {
    const target = e.target as Element;

    e.dataTransfer.setData('text/plain', JSON.stringify(data));

    target.classList?.add('opacity-50');
    target.classList?.add('border-2');
  };

  const onDragEndHandler = (e: React.DragEvent) => {
    const target = e.target as Element;
    target.classList.remove('opacity-50');
    target.classList.remove('border-2');
  };

  const onDropHandler = (e: React.DragEvent) => {
    cardDropHandler(boardIndex, JSON.parse(e.dataTransfer.getData('text')));
  };

  return (
    <div className="w-[250px] min-w-[250px] mr-3 rounded-sm p-2 bg-[#ebecf0]">
      <div
        onDoubleClick={() => setShowTitleUpdate(true)}
        className="flex align-middle justify-between mx-1 w-100"
      >
        {showTitleUpdate ? (
          <FormInput.Text
            placeholder="Masukan board..."
            value={title}
            onEnter={(e) => e.key === 'Enter' && setShowTitleUpdate(false)}
            className="outline-none border-2 border-sky-700 scroll-m-0"
            inputHandler={(e) => titleChangeHandler(boardIndex, e.target.value)}
          ></FormInput.Text>
        ) : (
          <span className="font-medium">{title}</span>
        )}

        <AiOutlineMore className="ckeyursor-pointer mt-1" />
      </div>

      <div onDrop={onDropHandler}>
        {cards?.map((data, index) => (
          <div
            className="p-2 bg-white rounded-sm my-2 cursor-pointer shadow-sm text-xs hover:bg-slate-100 delay-100"
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
