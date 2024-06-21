import { InputWithLabelProps } from '@/types/AuthType';

const InputWithLabelPassWord = ({ id, label, type, placeholder }: InputWithLabelProps) => {
  return (
    <div className="authContainer">
      <label htmlFor={id} className="authLabel">
        {label}
      </label>
      <input id={id} type={type} placeholder={placeholder} className="authInput" />
    </div>
  );
};

export default InputWithLabelPassWord;
