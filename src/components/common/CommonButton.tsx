import React, { ComponentProps } from 'react';
import { motion, MotionProps } from 'framer-motion';

interface CommonButtonProps extends ComponentProps<'button'> {
  variant: 'primary' | 'secondary';
  isActive?: boolean;
  className?: string;
  children: React.ReactNode;
}

const CommonButton = ({
  variant = 'primary',
  isActive = true,
  className = '',
  children,
  ...props
}: CommonButtonProps) => {
  // 버튼 기본 스타일링
  const baseClassName = `h-11 rounded-lg text-md-semibold px-5 py-2.5 max-w-[400px]`;
  let variantClassName = '';

  switch (variant) {
    // primary에 해당하는 버튼
    case 'primary':
      variantClassName = `center text-white ${isActive ? 'bg-primary-green-200 hover:bg-primary-green-300' : 'bg-grayscale-300'}`;
      break;
    // secondary에 해당하는 버튼
    case 'secondary':
      variantClassName = `text-primary-green-200 border-2 border-primary-green-200 center`;
      break;
  }

  return (
    <motion.button
      className={`${baseClassName} ${className} ${variantClassName}`}
      initial={{ scale: 1 }}
      whileTap={{ scale: 0.9 }}
      {...(props as MotionProps)}
    >
      {children}
    </motion.button>
  );
};

export default CommonButton;
