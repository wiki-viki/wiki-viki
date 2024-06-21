import {
  AuthContainer,
  CenterLine,
  InputWithLabelEmail,
  InputWithLabelNickName,
  InputWithLabelPassWord,
} from '@/components/Auth';

const SignUpPage = () => {
  return (
    <AuthContainer title="회원가입">
      <InputWithLabelEmail label="이름" id="nickName" placeholder="이름을 입력해 주세요." />
      <InputWithLabelNickName label="이메일" id="email" placeholder="이메일을 입력해 주세요." />
      <InputWithLabelPassWord
        label="비밀번호"
        id="password"
        type="password"
        placeholder="비밀번호를 입력해 주세요."
      />
      <InputWithLabelPassWord
        label="비밀번호 확인"
        id="passwordConfirmation"
        type="password"
        placeholder="비밀번호를 입력해 주세요."
      />
      <CenterLine href="/signup" auth="로그인" />
    </AuthContainer>
  );
};

export default SignUpPage;
