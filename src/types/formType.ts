export interface LabelProps {
  id: string;
  label?: string;
  className: string;
}

export interface InputProps extends LabelProps {
  name: string;
  type?: string;
  placeholder?: string;
}
