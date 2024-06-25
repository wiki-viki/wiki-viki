import { LabelProps } from "@/types/formType";

const Label = ({ htmlFor, label, className }: LabelProps) => {
  return (
    <>
      <label htmlFor={htmlFor} className={className}>
        {label}
      </label>
    </>
  );
};

export default Label;
