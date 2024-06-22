import Link from 'next/link';
import { useRouter } from 'next/router';
import useIsLogin from '@/hooks/useIsLogin';
import useBoolean from '@/hooks/useBoolean';
import Logo from '../../../../public/svg/wiki-viki-logo.svg';
import NotifyIcon from '../../../../public/svg/notification.svg';
import ProfileIcon from '../../../../public/svg/profile.svg';
import HamburgerIcon from '../../../../public/svg/hamburger.svg';
import UserMenu from './UserMenu';
import HamburgerMenu from './HamburgerMenu';

const TopNavigationBar = () => {
  const { pathname } = useRouter();
  const isLogin = useIsLogin();
  const { value, handleOn, handleOff } = useBoolean();

  const linkClassNames = 'px-2 hover:rounded-md hover:bg-grayscale-100';
  const activeLinkClassNames = 'font-bold text-primary-green-300';

  return (
    <header className="fixed z-50 flex h-[60px] w-full items-center justify-between border-b-grayscale-300 bg-white px-5 shadow-md lg:h-[80px] lg:px-[80px]">
      <div className="flex items-center gap-5">
        <Link href="/">
          <Logo width={107} height={30} />
        </Link>
        <nav className="hidden md:block">
          <ul className="flex gap-5 text-md-regular text-grayscale-500 ">
            <Link href="/wikilist" className={linkClassNames}>
              <li className={`${pathname === '/wikilist' ? activeLinkClassNames : ''}`}>
                위키목록
              </li>
            </Link>
            <Link href="/boards" className={linkClassNames}>
              <li className={`${pathname === '/boards' ? activeLinkClassNames : ''}`}>
                자유게시판
              </li>
            </Link>
          </ul>
        </nav>
      </div>
      <div className="flex gap-6">
        {isLogin ? (
          <>
            <NotifyIcon width={24} height={24} className="cursor-pointer" />
            <ProfileIcon onClick={handleOn} width={24} height={24} className="cursor-pointer" />
          </>
        ) : (
          <>
            <Link
              href="/login"
              className={`${linkClassNames} hidden py-1 text-md-regular text-grayscale-400 md:block`}
            >
              로그인
            </Link>
            <div className="cursor-pointer md:hidden" onClick={handleOn}>
              <HamburgerIcon />
            </div>
          </>
        )}
      </div>
      <UserMenu className="hidden md:block" isOpen={value} onClose={handleOff} />
      <HamburgerMenu className="md:hidden" isOpen={value} onClose={handleOff} isLogin={isLogin} />
    </header>
  );
};

export default TopNavigationBar;
