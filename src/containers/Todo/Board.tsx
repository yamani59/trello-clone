import React, { useState, useRef, type SetStateAction } from 'react';
import { AiOutlineClose, AiOutlineMore } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';
import FormInput from '@/components/FormInput/Index';
import Options from './Options';

const Board = ({ cards, title, boardIndex, cardHandler, cardDropHandler, titleChangeHandler, deleteHandler, deleteCardHandler,}: BoardProps) => {
  const [showTextArea, setShowTextArea] = useState<boolean>(false);
  const [cardTitle, setCardTitle] = useState<string>('');
  const AddCard = useRef<HTMLElement>(null);
  const [showTitleUpdate, setShowTitleUpdate] = useState<boolean>(false);
  const [showOptions, setShowOptios] = useState<boolean>(false);
  const [optionCordinat, setOptionCordinat] = useState<Cordinat>();
  let checkGhostElement: string;

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
    document.getElementById('ghost_card')?.remove();
  };

  const onDragOverHanler = (e: React.DragEvent) => {
    e.preventDefault();
    const target = e.target as Element;
    const ghostElement = document.createElement('div');
    ghostElement.setAttribute('id', 'ghost_card');
    ghostElement.classList.add(
      ...'p-2 rounded-sm my-2 h-[36px] cursor-pointer shadow-sm text-xs border-dotted border-2 bg-slate-100 delay-100'.split(
        ' '
      )
    );

    if (checkGhostElement !== target.getAttribute('id')) {
      document.getElementById('ghost_card')?.remove();
      checkGhostElement = target.getAttribute('id') as string;
      target.parentElement?.insertBefore(ghostElement, target);
    }
  };

  const optionHandler = (e: React.MouseEvent) => {
    setShowOptios(!showOptions);
    setOptionCordinat(() => ({
      x: e.clientX,
      y: e.clientY,
    }));
  };

  return (
    <div className="w-[250px] min-w-[250px] mr-3 rounded-sm p-2 bg-[#ebecf0]">
      <div className="flex align-middle justify-between mx-1 w-100">
        {showTitleUpdate ? (
          <FormInput.Text
            placeholder="Masukan board..."
            value={title}
            autoFocus={true}
            onEnter={(e) => e.key === 'Enter' && setShowTitleUpdate(false)}
            className="outline-none border-2 border-sky-700 scroll-m-0"
            inputHandler={(e) => titleChangeHandler(boardIndex, e.target.value)}
          ></FormInput.Text>
        ) : (
          <div>
            <span
              onDoubleClick={() => setShowTitleUpdate(true)}
              className="font-medium cursor-pointer w-96"
            >
              {title}
            </span>
          </div>
        )}

        <AiOutlineMore
          onClick={optionHandler}
          className="cursor-pointer mt-1 text-xl"
        />
      </div>

      <div onDrop={onDropHandler}>
        {cards?.map((data, index) => (
          <div
            id={`board_${boardIndex}_card_${index}`}
            className="p-2 bg-white rounded-sm my-2 flex justify-between align-middle cursor-pointer shadow-sm text-xs hover:bg-slate-100 delay-100"
            key={index}
            draggable
            onDragStart={(e) => onDragOverHandler(e, data)}
            onDragOver={onDragOverHanler}
            onDragEnd={onDragEndHandler}
            onDragEndCapture={(e) => {
              document.getElementById('ghost_card')?.remove();
            }}
          >
            {data.name}
            <BsFillTrashFill
              onClick={() => deleteCardHandler(boardIndex, index)}
              className="text-red-600"
            />
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

      {showOptions && (
        <Options
          {...optionCordinat}
          className="w-[200px]"
          title={'List Actions'}
          closeHandler={() => {
            setShowOptios(!showOptions);
          }}
        >
          <ul className="cursor-pointer mx-[-8px] text-sm text-gray-700">
            <li
              onClick={() => {
                deleteHandler(boardIndex);
                setShowOptios(!showOptions);
              }}
              className="py-2 hover:bg-gray-100 px-2 duration-100"
            >
              Hapus Board
            </li>
          </ul>
        </Options>
      )}
    </div>
  );
};

export default Board;
