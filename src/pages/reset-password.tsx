import { ChangePassWord } from '@/components/Account';
import MetaTag from '@/components/common/MetaTag';
import OpenGraphTag from '@/components/common/MetaTag/OpenGraphTag';

const ResetPassword = () => {
  return (
    <>
      <MetaTag title="비밀번호 변경" description="비밀번호 변경 페이지" />
      <OpenGraphTag title="비밀번호 변경" description="비밀번호 변경 페이지" />
      <ChangePassWord />
    </>
  );
};

export default ResetPassword;
