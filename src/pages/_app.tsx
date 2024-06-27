import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Wrapper from '@/components/common/Container';
import TopNavigationBar from '@/components/common/TopNavigationBar';

const App = ({ Component, pageProps, router }: AppProps) => {
  const noNavBarPages = ['/404', '/_error'];
  const isNoNavBarPage = noNavBarPages.includes(router.pathname);

  return (
    <>
      {!isNoNavBarPage && <TopNavigationBar />}
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </>
  );
};

export default App;
