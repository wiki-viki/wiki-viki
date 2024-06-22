import Link from 'next/link';
import { useRouter } from 'next/router';
import useIsLogin from '@/hooks/useIsLogin';
import { HeaderContainer, LeftSection, RightSection } from '.';

const NavigationBar = () => {
  const { pathname } = useRouter();
  const isLogin = useIsLogin();

  const linkClassNames = 'px-2 hover:rounded-md hover:bg-grayscale-100';
  const activeLinkClassNames = 'font-bold text-primary-green-300';

  return (
    <HeaderContainer>
      <LeftSection>
        <nav>
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
      </LeftSection>
      <RightSection isLogin={isLogin}>
        <Link href="/login" className={`${linkClassNames} py-1 text-md-regular text-grayscale-400`}>
          로그인
        </Link>
      </RightSection>
    </HeaderContainer>
  );
};

export default NavigationBar;
