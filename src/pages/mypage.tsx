import { ChangePassWord, CreateWiki } from '@/components/Account';
import MetaTag from '@/components/common/MetaTag';

const MyPage = () => {
  return (
    <>
      <MetaTag title="마이페이지" description="마이페이지" url="mypage" />
      <ChangePassWord />
      <CreateWiki />
    </>
  );
};

export default MyPage;
