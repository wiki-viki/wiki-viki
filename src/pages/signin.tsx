import { useForm } from 'react-hook-form';
import { AuthContainer, AuthSwitchPrompt, AuthInputWithLabel } from '@/components/Auth';
import { DefaultFormData } from '@/types/authFormType';
import { EMAIL_REGEX } from '../../constants/regex';
import {
  REQUIRED_MESSAGE,
  INVALID_EMAIL_MESSAGE,
  PASSWORD_MIN_LENGTH_MESSAGE,
} from '../../constants/messages';


const emailPattern = {
  value: EMAIL_REGEX,
  message: INVALID_EMAIL_MESSAGE,
};

const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DefaultFormData>();

  const onSubmit = handleSubmit((data) => {
    console.log('submitting');
    console.log(data);
  });

  return (
    <AuthContainer title="로그인">
      <form onSubmit={onSubmit}>
        <AuthInputWithLabel
          id="email"
          name="email"
          label="이메일"
          type="text"
          placeholder="이메일을 입력해 주세요."
          register={register}
          rules={{
            required: REQUIRED_MESSAGE,
            pattern: emailPattern,
          }}
          errors={errors}
        />
        <AuthInputWithLabel
          id="password"
          name="password"
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해 주세요."
          register={register}
          rules={{
            required: REQUIRED_MESSAGE,
            minLength: {
              value: 8,
              message: PASSWORD_MIN_LENGTH_MESSAGE,
            },
          }}
          errors={errors}
        />
        <button type="submit">버튼</button>
      </form>
      <AuthSwitchPrompt href="/signin" auth="로그인" />
    </AuthContainer>
  );
};

export default SignInPage;
