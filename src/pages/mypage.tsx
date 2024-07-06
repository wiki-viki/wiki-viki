import { CreateWiki } from '@/components/Account';
import MetaTag from '@/components/common/MetaTag';
import OpenGraphTag from '@/components/common/MetaTag/OpenGraphTag';

const MyPage = () => {
  return (
    <>
      <MetaTag title="마이페이지" description="마이페이지" />
      <OpenGraphTag title="마이페이지" description="마이페이지" />
      <CreateWiki />
    </>
  );
};

export default MyPage;
