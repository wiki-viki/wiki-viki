import { InputWithLabelProps } from '@/types/AuthType';

const InputWithLabelEmail = ({ id, label, placeholder }: InputWithLabelProps) => {
  return (
    <div className="authContainer">
      <label htmlFor={id} className="authLabel">
        {label}
      </label>
      <input
        id={id}
        placeholder={placeholder}
        className="authInput"
      />
    </div>
  );
};

export default InputWithLabelEmail;
