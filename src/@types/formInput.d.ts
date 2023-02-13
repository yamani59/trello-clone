interface FormProps {
  required?: boolean;
  placeholder?: string;
  value?: string | number;
  className?: string;
  onEnter?: (param: any) => void;
  inputHandler: (param: any) => void;
}
