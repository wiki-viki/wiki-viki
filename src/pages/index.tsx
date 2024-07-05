import {
  Header,
  WriteSection,
  ShareSection,
  ViewSection,
  CreateWikiSection,
  Footer,
} from '@/components/Landing';
import MetaTag from '@/components/common/MetaTag';

const LandingPage = () => {
  return (
    <>
      <MetaTag description="메인 랜딩페이지" />
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
