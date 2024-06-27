import { ReactNode } from "react";
import { UseFormRegister, FieldValues, FieldErrors, Path } from 'react-hook-form';

export interface AuthContainerProps {
  title: string;
  children: ReactNode;
}

export interface AuthSwitchPromptProps {
  href: string;
  auth: string;
}

// Sign In & Sign Up
export type DefaultFormData = {
  email: string;
  name: string;
  password: string;
  passwordConfirmation: string;
}

export interface InputWithLabelProps<T extends FieldValues> {
  id: string;
  name: Path<T>;
  label: string;
  type: string;
  placeholder: string;
  register: UseFormRegister<T>;
  rules: {
    required: string;
    pattern?: {
      value: RegExp;
      message: string;
    };
    maxLength?: {
      value: number;
      message: string;
    };
    minLength?: {
      value: number;
      message: string;
    };
    validate?: (value: string) => boolean | string;
  };
  errors: FieldErrors<T>;
}
