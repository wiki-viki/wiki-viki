import Link from 'next/link';

const Header = () => {
  return (
    <header className="fixed flex w-screen bg-slate-400">
      <div className="flex">
        <Link href="/">로고</Link>
        <nav>
          <ul className="flex">
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
        <Link href="/login">로그인</Link>
      </div>
    </header>
  );
};

export default Header;
