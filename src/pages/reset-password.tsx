import { ChangePassWord } from '@/components/Account';
import MetaTag from '@/components/common/MetaTag';

const ResetPassword = () => {
  return (
    <>
      <MetaTag title="비밀번호 변경" description="비밀번호 변경 페이지" url="reset-password" />
      <ChangePassWord />
    </>
  );
};

export default ResetPassword;
