import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import useBoolean from '@/hooks/useBoolean';
import { useUserStore } from '@/store/userStore';
import Logo from '@/../public/svg/wiki-viki-logo.svg';
import NotifyIcon from '@/../public/svg/notification.svg';
import ProfileIcon from '@/../public/svg/profile.svg';
import HamburgerIcon from '@/../public/svg/hamburger.svg';
import UserMenu from './UserMenu';
import AuthUserMenu from './AuthUserMenu';
import NoticeMenu from './NoticeMenu';

const linkClassNames = 'px-2 hover:rounded-md hover:bg-grayscale-100';
const activeLinkClassNames = 'font-bold text-primary-green-300';

const TopNavigationBar = () => {
  const { pathname } = useRouter();
  const { isLogin, checkLogin } = useUserStore();

  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuContainerRef = useRef<HTMLDivElement | null>(null);
  const { value: isMenuOpen, handleOff: menuClose, handleToggle: menuToggle } = useBoolean();

  const noticeRef = useRef<HTMLDivElement | null>(null);
  const noticeContainerRef = useRef<HTMLDivElement | null>(null);
  const { value: isNoticeOpen, handleOff: noticeClose, handleToggle: noticeToggle } = useBoolean();

  useEffect(() => {
    checkLogin();
  }, [checkLogin]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        menuContainerRef.current &&
        !menuContainerRef.current.contains(e.target as Node)
      ) {
        menuClose();
      }
      if (
        noticeRef.current &&
        !noticeRef.current.contains(e.target as Node) &&
        noticeContainerRef.current &&
        !noticeContainerRef.current.contains(e.target as Node)
      ) {
        noticeClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuClose, noticeClose]);

  return (
    <header className="fixed z-20 flex h-[60px] w-full items-center justify-between border-b-grayscale-300 bg-white px-5 shadow-md lg:h-[80px] lg:px-[80px]">
      <div className="flex items-center gap-5">
        <Link href="/" rel="preload">
          <Logo width={107} height={30} />
        </Link>
        <nav className="hidden md:block">
          <ul className="flex gap-5 text-md-regular text-grayscale-500 ">
            <Link href="/wikilist" className={linkClassNames} rel="preload">
              <li className={`${pathname === '/wikilist' ? activeLinkClassNames : ''}`}>
                위키목록
              </li>
            </Link>
            <Link href="/boards" className={linkClassNames} rel="preload">
              <li className={`${pathname === '/boards' ? activeLinkClassNames : ''}`}>
                자유게시판
              </li>
            </Link>
          </ul>
        </nav>
      </div>
      <div>
        {isLogin ? (
          <>
            <div className="flex gap-6">
              <div ref={noticeRef} onClick={noticeToggle}>
                <NotifyIcon width={24} height={24} className="cursor-pointer" />
              </div>
              <div ref={menuRef} onClick={menuToggle}>
                <ProfileIcon width={24} height={24} className="cursor-pointer"></ProfileIcon>
              </div>
            </div>
            <div ref={menuContainerRef}>
              <AuthUserMenu isOpen={isMenuOpen} handleClose={menuClose} />
            </div>
            <div ref={noticeContainerRef}>
              <NoticeMenu handleClose={noticeClose} isOpen={isNoticeOpen} />
            </div>
          </>
        ) : (
          <>
            <Link
              rel="preload"
              href="/login"
              className={`${linkClassNames} hidden py-1 text-md-regular text-grayscale-400 md:block`}
            >
              로그인
            </Link>
            <div ref={menuRef} onClick={menuToggle} className="cursor-pointer md:hidden">
              <HamburgerIcon />
            </div>
            <div ref={menuContainerRef}>
              <UserMenu isOpen={isMenuOpen} handleClose={menuClose} />
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default TopNavigationBar;
