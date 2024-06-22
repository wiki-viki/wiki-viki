import { ReactNode } from 'react';
import Link from 'next/link';
import Logo from '../../../../public/svg/wiki-viki-logo.svg';
import NotifyIcon from '../../../../public/svg/notification.svg';
import ProfileIcon from '../../../../public/svg/profile.svg';

/**
 * 헤더 컨테이너
 */
interface HeaderContainerProps {
  children: ReactNode;
}

export const HeaderContainer = ({ children }: HeaderContainerProps) => {
  return (
    <header className="fixed z-50 flex h-[60px] w-full items-center justify-between border-b-grayscale-300 bg-white px-5 shadow-md lg:h-[80px] lg:px-[80px]">
      {children}
    </header>
  );
};

/**
 * 헤더 오른쪽 부분
 */
interface LeftSectionProps {
  children?: ReactNode;
}

export const LeftSection = ({ children }: LeftSectionProps) => {
  return (
    <div className="flex items-center gap-5">
      <Link href="/">
        <Logo width={107} height={30} />
      </Link>
      {children}
    </div>
  );
};

/**
 * 헤더 오른쪽 부분
 */
interface RightSectionProps {
  isLogin: boolean;
  handleOpen: () => void;
  children: ReactNode;
}

export const RightSection = ({ isLogin, handleOpen, children }: RightSectionProps) => {
  return (
    <div className="flex gap-6">
      {isLogin ? (
        <>
          <NotifyIcon width={24} height={24} className="cursor-pointer" />
          <ProfileIcon onClick={handleOpen} width={24} height={24} className="cursor-pointer" />
        </>
      ) : (
        children
      )}
    </div>
  );
};
