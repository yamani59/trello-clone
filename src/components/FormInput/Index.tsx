import { useEffect, useRef, useState } from 'react';

const TextArea = ({ inputHandler, required, className, autoFocus }: FormProps) => {
  const textArea = useRef<HTMLTextAreaElement>(null);
  const [textAreaHeight, setTextAreaHeight] = useState<number>(60);

  useEffect(() => {
    typeof className !== 'undefined' &&
      textArea.current?.classList.add(...className.split(' '));
  }, []);

  function resizeHandler() {
    setTextAreaHeight(textArea.current?.scrollHeight as number);
    inputHandler(textArea.current?.value);
  }

  return (
    <div>
      <textarea
        style={{ height: textAreaHeight }}
        ref={textArea}
        onInput={resizeHandler}
        placeholder="Masukan judul untuk kartu ini..."
        className="w-[100%] placeholder:text-sm text-sm rounded-sm p-2 resize-none"
      />
    </div>
  );
};

const Text = ({ onEnter, inputHandler, className, placeholder, value, autoFocus }: FormProps) => {
  const text = useRef<HTMLInputElement>(null);

  useEffect(() => {
    typeof className !== 'undefined' &&
      text.current?.classList.add(...className.split(' '));
    if (autoFocus === true) text.current?.focus()
  }, []);

  return (
    <div>
      <input
        ref={text}
        type="text"
        onKeyDown={onEnter}
        defaultValue={value}
        placeholder={placeholder}
        onInput={inputHandler}
        className="w-[100%] placeholder:text-sm text-sm rounded-none p-2"
      />
    </div>
  );
};

const FormInput = {
  TextArea,
  Text,
};

export default FormInput;
