export interface LabelProps {
  htmlFor?: string;
  label?: string;
  className: string;
}

export interface InputProps extends LabelProps {
  id: string;
  name: string;
  type?: string;
  placeholder?: string;
}
