import {
  AuthContainer,
  CenterLine,
  InputWithLabelEmail,
  InputWithLabelPassWord,
} from '@/components/Auth';

const SignInPage = () => {
  return (
    <AuthContainer title="로그인">
      <InputWithLabelEmail label="이름" id="nickName" placeholder="이름을 입력해 주세요." />
      <InputWithLabelPassWord
        label="비밀번호"
        id="password"
        placeholder="비밀번호를 입력해 주세요."
      />
      <CenterLine href="/signin" auth="로그인" />
    </AuthContainer>
  );
};

export default SignInPage;
