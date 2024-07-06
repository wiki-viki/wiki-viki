import {
  Header,
  WriteSection,
  ShareSection,
  ViewSection,
  CreateWikiSection,
  Footer,
} from '@/components/Landing';
import MetaTag from '@/components/common/MetaTag';
import OpenGraphTag from '@/components/common/MetaTag/OpenGraphTag';

const LandingPage = () => {
  return (
    <>
      <MetaTag title="" description="메인 페이지" />
      <OpenGraphTag title="" description="메인 페이지" />
      <Header />
      <WriteSection />
      <ShareSection />
      <ViewSection />
      <CreateWikiSection />
      <Footer />
    </>
  );
};

export default LandingPage;
