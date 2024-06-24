import { useForm } from 'react-hook-form';
import { AuthContainer, AuthSwitchPrompt, AuthInputWithLabel } from '@/components/Auth';
import { DefaultFormData } from '@/types/authFormType';
import CommonButton from '@/components/common/CommonButton';
import { EMAIL_REGEX } from '@/constants/regex';
import {
  REQUIRED_MESSAGE,
  INVALID_EMAIL_MESSAGE,
  PASSWORD_MIN_LENGTH_MESSAGE,
  PASSWORD_MISMATCH_MESSAGE,
} from '@/constants/messages';

const emailPattern = {
  value: EMAIL_REGEX,
  message: INVALID_EMAIL_MESSAGE,
};

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<DefaultFormData>({ mode: 'onBlur' });

  const onSubmit = handleSubmit((data) => {
    console.log('submitting');
    console.log(data);
  });

  const buttonDisabled = !isValid;

  return (
    <AuthContainer title="회원가입">
      <form onSubmit={onSubmit}>
        <AuthInputWithLabel
          id="name"
          name="name"
          label="이름"
          type="text"
          placeholder="이름을 입력해 주세요."
          register={register}
          rules={{
            required: REQUIRED_MESSAGE,
          }}
          errors={errors}
        />
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
        <AuthInputWithLabel
          id="passwordConfirmation"
          name="passwordConfirmation"
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 입력해 주세요."
          register={register}
          rules={{
            required: REQUIRED_MESSAGE,
            minLength: {
              value: 8,
              message: PASSWORD_MIN_LENGTH_MESSAGE,
            },
            validate: (value) => {
              return value === getValues('password') || PASSWORD_MISMATCH_MESSAGE;
            },
          }}
          errors={errors}
        />
        <CommonButton
          type="submit"
          disabled={buttonDisabled}
          isActive={!buttonDisabled}
          variant="primary"
          className="mb-10 md:w-[335px] lg:w-full"
        >
          가입하기
        </CommonButton>
      </form>
      <AuthSwitchPrompt href="/login" auth="로그인" />
    </AuthContainer>
  );
};

export default SignUpPage;
