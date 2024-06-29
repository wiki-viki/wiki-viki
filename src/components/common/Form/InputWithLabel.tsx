import { useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { Label, Input } from '@/components/common/Form';
import { InputWithLabelProps } from '@/types/authFormType';
import UnLockIcon from '@/components/common/Form/UnLock';
import LockIcon from '@/components/common/Form/Lock';
import useBoolean from '@/hooks/useBoolean';

const AuthInputWithLabel = <T extends FieldValues>({
  id,
  name,
  label,
  type,
  register,
  rules,
  errors,
  ...props
}: InputWithLabelProps<T>) => {
  const [inputType, setInputType] = useState(type);
  const { value: password, handleToggle: togglePassword } = useBoolean();

  const handleIconClick = () => {
    togglePassword();
    setInputType(password ? 'password' : 'text');
  };

  const hasError = !!errors[name];
  const errorMessages = hasError ? (errors[name]?.message as string) : '';

  return (
    <div className="mb-6 flex flex-col gap-2.5">
      <div className="formContainer">
        <Input
          id={id}
          type={inputType}
          {...props}
          {...register(name, rules)}
          className={`input ${hasError ? 'inputError' : ''}`}
        />
        <Label htmlFor={id} label={label} className={`label ${hasError && 'labelError'}`} />
        {type === 'password' && (
          <span className={`checkPassword ${hasError ? 'top-1/3' : ''}`} onClick={handleIconClick}>
            {password ? <UnLockIcon /> : <LockIcon />}
          </span>
        )}
        {hasError && <span className="errorMessage">{errorMessages}</span>}
      </div>
    </div>
  );
};

export default AuthInputWithLabel;
