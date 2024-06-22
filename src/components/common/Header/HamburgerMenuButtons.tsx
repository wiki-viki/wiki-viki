import React from 'react';
import Link from 'next/link';
import CommonButton from '../CommonButton';

interface RenderButtonsProps {
  isLogin: boolean;
}

type ButtonProps = {
  label: string;
  variant: 'primary' | 'secondary';
  link: string;
  className?: string;
};

const HamburgerMenuButtons = ({ isLogin }: RenderButtonsProps) => {
  const secondaryClassNames = 'bg-white hover:bg-grayscale-100';

  const navButtons: ButtonProps[] = [
    { label: '위키목록', variant: 'primary', link: '/wikilist' },
    { label: '자유게시판', variant: 'primary', link: '/boards' },
  ];

  const userButtons: ButtonProps[] = [
    {
      label: '계정설정',
      variant: 'secondary',
      link: '/mypage',
      className: secondaryClassNames,
    },
    { label: '내 위키', variant: 'primary', link: '/link/code' },
    {
      label: '로그아웃',
      variant: 'secondary',
      link: '/logout',
      className: secondaryClassNames,
    },
  ];

  const loginButton: ButtonProps[] = [
    {
      label: '로그인',
      variant: 'secondary',
      link: '/login',
      className: secondaryClassNames,
    },
  ];

  const buttons = isLogin ? [...navButtons, ...userButtons] : [...loginButton, ...navButtons];

  return (
    <div className="w-[180px] flex-col">
      {buttons.map((button) => {
        return (
          <Link href={button.link} key={button.label}>
            <CommonButton
              variant={button.variant}
              className={`mt-5 w-full shadow-lg ${button.className || ''}`}
            >
              {button.label}
            </CommonButton>
          </Link>
        );
      })}
    </div>
  );
};

export default HamburgerMenuButtons;
