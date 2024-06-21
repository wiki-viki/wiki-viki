import Link from 'next/link';
// import useIsMobile from '@/hooks/useIsMobile';
import Logo from '../../../public/svg/wiki-viki-logo.svg';

const Header = () => {
  // const isMobile = useIsMobile();

  return (
    <header className="fixed z-50 flex h-[60px] w-full items-center justify-between border-b-grayscale-300 bg-white px-5 shadow-custom lg:px-[80px]">
      <div className="flex items-center  gap-5">
        <Link href="/">
          <Logo width={107} height={30} />
        </Link>
        <nav>
          <ul className="flex gap-5 text-md-regular text-gray-500">
            <Link href="/wikilist">
              <li>위키목록</li>
            </Link>
            <Link href="/boards">
              <li>자유게시판</li>
            </Link>
          </ul>
        </nav>
      </div>
      <div>
        <Link href="/login" className=" text-md-regular text-grayscale-400">
          로그인
        </Link>
      </div>
    </header>
  );
};

export default Header;
