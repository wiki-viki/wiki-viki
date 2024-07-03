import { useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import { AnimatePresence, motion } from 'framer-motion'; // motion import 추가
import Wrapper from '@/components/common/Container';
import TopNavigationBar from '@/components/common/TopNavigationBar';
import '@/lib/axiosInterceptor';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
import 'react-quill/dist/quill.snow.css';
import 'react-toastify/dist/ReactToastify.css';
import SplashScreen from '@/components/Landing/SplashScreen';
import '@/styles/globals.css';

const App = ({ Component, pageProps, router }: AppProps) => {
  const [showSplash, setShowSplash] = useState(true);
  const noNavBarPages = ['/404', '/500'];
  const isNoNavBarPage = noNavBarPages.includes(router.pathname);
  const isLandingPage = router.pathname === '/';
  
  useEffect(() => {
    if (router.pathname !== '/') {
      setShowSplash(false);
    }
  }, [router.pathname]);
  
  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  if (showSplash && isLandingPage) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  if (isNoNavBarPage) {
    return <Component {...pageProps} />;
  }

  if (isLandingPage) {
    return (
      <>
        <TopNavigationBar />
        <Component {...pageProps} />
      </>
    );
  }

  return (
    <>
      <AnimatePresence mode="wait">
        <TopNavigationBar />
        <Wrapper>
          <motion.div
            key={router.asPath}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Component {...pageProps} />
          </motion.div>
        </Wrapper>
      </AnimatePresence>
    </>
  );
};

export default App;
