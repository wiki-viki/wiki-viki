import React, { ButtonHTMLAttributes } from 'react';

interface CommonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary';
  isActive?: boolean;
  className?: string;
  children: React.ReactNode;
}

const CommonButton = ({ variant, isActive, className, children, ...props }: CommonButtonProps) => {
  // 버튼 기본 스타일링
  const baseClassName = `h-11 rounded-lg text-md-semibold px-5 py-2.5 max-w-96`;
  let variantClassName = '';

  switch (variant) {
    // primary에 해당하는 버튼
    case 'primary':
      variantClassName = `flex justify-center items-center text-white ${isActive ? 'bg-primary-green-200 hover:bg-primary-green-300' : 'bg-grayscale-300'}`;
      break;
    // secondary에 해당하는 버튼
    case 'secondary':
      variantClassName = `text-primary-green-200 border-2 border-primary-green-200 flex justify-center items-center`;
      break;
  }

  return (
    <button className={`${baseClassName} ${className} ${variantClassName}`} {...props}>
      {children}
    </button>
  );
};

export default CommonButton;
