import { LabelProps } from "@/types/formType";

const Label = ({ id, label, className }: LabelProps) => {
  return (
    <>
      <label htmlFor={id} className={className}>
        {label}
      </label>
    </>
  );
};

export default Label;
