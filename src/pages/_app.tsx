import '@/styles/globals.css';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import 'react-quill/dist/quill.snow.css';
import 'react-toastify/dist/ReactToastify.css';
import { Zoom } from 'react-toastify';
import dynamic from 'next/dynamic';
import type { AppProps } from 'next/app';
import Wrapper from '@/components/common/Container';
import TopNavigationBar from '@/components/common/TopNavigationBar';
import '@/lib/axiosInterceptor';

const DynamicToastContainer = dynamic(
  () => {
    return import('@/styles/ToastStyle').then((mod) => {
      return mod.StyledToastContainer;
    });
  },
  {
    ssr: false,
  },
);

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
          <DynamicToastContainer transition={Zoom} />
        </>
      )}
    </>
  );
};

export default App;
