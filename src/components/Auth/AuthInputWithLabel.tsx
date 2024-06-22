import {Label, Input} from '@/components/common/Form';
import { InputWithLabelProps } from '@/types/authType';
import { FieldValues } from 'react-hook-form';

const AuthInputWithLabel = <T extends FieldValues>({ id, name, label, register, rules, errors, ...props }: InputWithLabelProps<T>) => {
  const hasError = !!errors[name];
  const errorMessages = hasError ? errors[name]?.message as string : '';

  return (
    <div className="flex flex-col gap-2.5 mb-6">
      <Label id={id} label={label} className="text-md-regular text-grayscale-500" />
      <Input
        id={id}
        {...props}
        {...(register(name, rules))}
        className={`h-[45px] rounded-xl px-5 py-3.5 bg-grayscale-100 placeholder:text-grayscale-600 placeholder:text-md-regular ${hasError ? 'bg-secondary-red-100' : ''}`}
      />
      {hasError && <span className="text-xs-regular text-secondary-red-200">{errorMessages}</span>}
    </div>
  );
};

export default AuthInputWithLabel;
