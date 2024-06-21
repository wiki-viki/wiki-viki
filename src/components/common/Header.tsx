import Link from 'next/link';
// import useIsMobile from '@/hooks/useIsMobile';
import { useRouter } from 'next/router';
import useIsLogin from '@/hooks/useIsLogin';
import Logo from '../../../public/svg/wiki-viki-logo.svg';
import NotifyIcon from '../../../public/svg/notification.svg';
import ProfileIcon from '../../../public/svg/profile.svg';

const Header = () => {
  // const isMobile = useIsMobile();
  const { pathname } = useRouter();
  const isLogin = useIsLogin();

  return (
    <header className="fixed z-50 flex h-[60px] w-full items-center justify-between border-b-grayscale-300 bg-white px-5 shadow-custom lg:h-[80px] lg:px-[80px]">
      <div className="flex items-center  gap-5">
        <Link href="/">
          <Logo width={107} height={30} />
        </Link>
        <nav>
          <ul className="flex gap-5 text-md-regular text-grayscale-500 ">
            <Link href="/wikilist" className="px-2 hover:rounded-md hover:bg-grayscale-100">
              <li
                className={`${pathname === '/wikilist' ? 'font-bold text-primary-green-300' : ''}`}
              >
                위키목록
              </li>
            </Link>
            <Link href="/boards" className="px-2 hover:rounded-md hover:bg-grayscale-100">
              <li className={`${pathname === '/boards' ? 'font-bold text-primary-green-300' : ''}`}>
                자유게시판
              </li>
            </Link>
          </ul>
        </nav>
      </div>
      <div className="flex gap-6">
        {isLogin ? (
          <>
            <NotifyIcon width={24} height={24} className="cursor-pointer lg:size-[32px]" />
            <ProfileIcon width={24} height={24} className="cursor-pointer lg:size-[32px]" />
          </>
        ) : (
          <Link
            href="/login"
            className=" px-2 py-1 text-md-regular text-grayscale-400 hover:rounded-md hover:bg-grayscale-100"
          >
            로그인
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
