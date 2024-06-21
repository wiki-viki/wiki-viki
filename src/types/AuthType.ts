import { ReactNode } from "react";

export interface AuthContainerProps {
  title: string;
  children: ReactNode;
}

export interface InputWithLabelProps {
  label: string;
  id: string;
  type?: string;
  placeholder: string;
}

export interface CenterLineProps {
  href: string;
  auth: string;
}