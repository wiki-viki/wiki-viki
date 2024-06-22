import React, { forwardRef } from 'react';
import { InputProps } from '@/types/formType';

const Input = forwardRef<HTMLInputElement, InputProps>(({ id, name, label, type, placeholder, className, ...props }, ref) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      ref={ref}
      className={className}
      {...props}
    />
  );
});

export default Input;
