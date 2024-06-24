import { ReactNode } from 'react';

interface WrapperProps {
  children: ReactNode;
}

const Wrapper = ({ children }: WrapperProps) => {
  return <div className="px-5 pt-20 lg:pt-[100px]">{children}</div>;
};

export default Wrapper;
