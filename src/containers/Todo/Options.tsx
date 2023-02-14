import { useEffect, useRef } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const Options = ({x, y, title, children, className, closeHandler}: OptionsProps) => {
  const optionElement = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (x !== undefined && y !== undefined) {
      (optionElement.current?.style as CSSStyleDeclaration).top = `${y - 10}px`;
      (optionElement.current?.style as CSSStyleDeclaration).left = `${x - 10}px`;
    }
    className !== undefined &&
      optionElement.current?.classList.add(...className.split(' '));
  }, []);

  return (
    <div
      ref={optionElement}
      className="fixed bg-white shadow-lg px-2 rounded-sm z-50"
    >
      <div className="border-b-[1px] py-2 border-[#ebecf0] text-center flex justify-center align-middle">
        <span className="text-sm w-[100%] text-gray-400">{title}</span>
          <AiOutlineClose onClick={closeHandler} className='text-gray-400 hover:text-black duration-100 cursor-pointer' />
      </div>
      {children}
    </div>
  );
};

export default Options;
