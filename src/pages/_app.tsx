import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Wrapper from '@/components/common/Container';
import TopNavigationBar from '@/components/common/TopNavigationBar';
import '@/lib/axiosInterceptor';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

const App = ({ Component, pageProps, router }: AppProps) => {
  const noNavBarPages = ['/404', '/500'];
  const isNoNavBarPage = noNavBarPages.includes(router.pathname);

  return (
    <>
      {isNoNavBarPage ? (
        <Component {...pageProps} />
      ) : (
        <>
          <TopNavigationBar />
          <Wrapper>
            <Component {...pageProps} />
          </Wrapper>
        </>
      )}
    </>
  );
};

export default App;
