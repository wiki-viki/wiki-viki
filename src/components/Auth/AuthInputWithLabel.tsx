import { FieldValues } from 'react-hook-form';
import { Label, Input } from '@/components/common/Form';
import { InputWithLabelProps } from '@/types/authFormType';

const AuthInputWithLabel = <T extends FieldValues>({
  id,
  name,
  label,
  register,
  rules,
  errors,
  ...props
}: InputWithLabelProps<T>) => {
  const hasError = !!errors[name];
  const errorMessages = hasError ? (errors[name]?.message as string) : '';

  return (
    <div className="mb-6 flex flex-col gap-2.5">
      <Label htmlFor={id} label={label} className="label" />
      <Input
        id={id}
        {...props}
        {...register(name, rules)}
        className={`input ${hasError ? 'bg-secondary-red-100' : ''}`}
      />
      {hasError && <span className="errorMessage">{errorMessages}</span>}
    </div>
  );
};

export default AuthInputWithLabel;
