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
      <Label id={id} label={label} className="text-md-regular text-grayscale-500" />
      <Input
        id={id}
        {...props}
        {...register(name, rules)}
        className={`h-[45px] rounded-xl bg-grayscale-100 px-5 py-3.5 outline-none placeholder:text-md-regular placeholder:text-grayscale-600 ${hasError ? 'bg-secondary-red-100' : ''}`}
      />
      {hasError && <span className="text-xs-regular text-secondary-red-200">{errorMessages}</span>}
    </div>
  );
};

export default AuthInputWithLabel;
