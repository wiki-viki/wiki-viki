import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import useIsMobile from '@/hooks/useIsMobile';
import NavigationBar from '@/components/common/Header/NavigationBar';
import MobileNavigationBar from '@/components/common/Header/MobileNavigationBar';
import Wrapper from '@/components/common/Container';

const App = ({ Component, pageProps }: AppProps) => {
  const isMobile = useIsMobile();

  return (
    <>
      {isMobile ? <MobileNavigationBar /> : <NavigationBar />}
      <Wrapper>
        <Component {...pageProps} />
      </Wrapper>
    </>
  );
};

export default App;
