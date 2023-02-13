import { useEffect, useRef, useState } from 'react';

const TextArea = ({ inputHandler, required, className }: FormProps) => {
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

// const Text = forwardRef(function Text(prosp: FormProps, ref) {
//   const inputRef = useRef<HTMLInputElement>(null)

//   useImperativeHandle(ref, () => ({
//     focus() {
//       inputRef.current?.focus()
//     },
//     // setValue() {
//     //   (inputRef.current as Object).value = prosp.value
//     // }
//   }), [])

//   return (
//     <input type="text" {...prosp} ref={inputRef} />
//   )
// });

const Text = ({ onEnter, inputHandler, className, placeholder, value }: FormProps) => {
  const text = useRef<HTMLInputElement>(null);

  useEffect(() => {
    typeof className !== 'undefined' &&
      text.current?.classList.add(...className.split(' '));
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
