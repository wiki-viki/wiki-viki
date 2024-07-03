import '@/styles/globals.css';
import { Zoom } from 'react-toastify';
import type { AppProps } from 'next/app';
import { AnimatePresence, motion } from 'framer-motion'; // motion import 추가
import { StyledToastContainer } from '@/styles/ToastStyle';
import Wrapper from '@/components/common/Container';
import TopNavigationBar from '@/components/common/TopNavigationBar';
import '@/lib/axiosInterceptor';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import 'react-quill/dist/quill.snow.css';
import 'react-toastify/dist/ReactToastify.css';

const App = ({ Component, pageProps, router }: AppProps) => {
  const noNavBarPages = ['/404', '/500'];
  const isNoNavBarPage = noNavBarPages.includes(router.pathname);

  return (
    <>
      {isNoNavBarPage ? (
        <>
          <Component {...pageProps} />
        </>
      ) : (
        <>
          <TopNavigationBar />
          <AnimatePresence mode="wait">
            <motion.div
              key={router.asPath}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Wrapper>
                <Component {...pageProps} />
              </Wrapper>
            </motion.div>
          </AnimatePresence>
          <StyledToastContainer transition={Zoom} />
        </>
      )}
    </>
  );
};

export default App;
