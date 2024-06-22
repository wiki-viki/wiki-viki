import React from 'react';
import CommonButton from '../CommonButton';

interface RenderButtonsProps {
  isLogin: boolean;
}

type ButtonProps = {
  label: string;
  variant: 'primary' | 'secondary';
  className?: string;
};

const HamburgerMenuButtons = ({ isLogin }: RenderButtonsProps) => {
  const secondaryClassNames = 'bg-white hover:bg-grayscale-100';

  const navButtons: ButtonProps[] = [
    { label: '위키목록', variant: 'primary' },
    { label: '자유게시판', variant: 'primary' },
  ];

  const userButtons: ButtonProps[] = [
    {
      label: '계정설정',
      variant: 'secondary',
      className: secondaryClassNames,
    },
    { label: '내 위키', variant: 'primary' },
    {
      label: '로그아웃',
      variant: 'secondary',
      className: secondaryClassNames,
    },
  ];

  const loginButton: ButtonProps[] = [
    {
      label: '로그인',
      variant: 'secondary',
      className: secondaryClassNames,
    },
  ];

  const buttons = isLogin ? [...navButtons, ...userButtons] : [...loginButton, ...navButtons];

  return (
    <div className="w-[180px] flex-col">
      {buttons.map((button, index) => {
        return (
          <CommonButton
            key={index}
            variant={button.variant}
            className={`mt-5 w-full shadow-lg ${button.className || ''}`}
          >
            {button.label}
          </CommonButton>
        );
      })}
    </div>
  );
};

export default HamburgerMenuButtons;
