import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { AuthContainer, AuthSwitchPrompt, AuthInputWithLabel } from '@/components/Auth';
import { DefaultFormData } from '@/types/authFormType';
import CommonButton from '@/components/common/CommonButton';
import { EMAIL_REGEX } from '@/constants/regex';
import {
  REQUIRED_MESSAGE,
  NAME_MAX_LENGTH_MESSAGE,
  INVALID_EMAIL_MESSAGE,
  PASSWORD_MIN_LENGTH_MESSAGE,
  PASSWORD_MISMATCH_MESSAGE,
} from '@/constants/messages';
import useAxiosFetch from '@/hooks/useAxiosFetch';

const emailPattern = {
  value: EMAIL_REGEX,
  message: INVALID_EMAIL_MESSAGE,
};

const SignUpPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<DefaultFormData>({ mode: 'onChange' });

  const { isLoading, isError, statusCode, axiosFetch } = useAxiosFetch({
    skip: true,
    options: {
      method: 'post',
      url: 'auth/signup',
    },
  });

  const onSubmit = handleSubmit(async (formData) => {
    const requestData = {
      data: formData,
    };
    await axiosFetch(requestData);
    router.push('/login');
  });

  const buttonDisabled = !isValid;

  const errorMessage = () => {
    if (statusCode === 400) {
      return isError;
    } else if (statusCode) {
      return `Error: ${statusCode}`;
    }
    return null;
  };

  const password = watch('password');

  return (
    <>
      {isLoading && <h1 className="center">로딩중</h1>}
      <AuthContainer title="회원가입">
        {isError && <p className="center">{errorMessage()}</p>}
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
              maxLength: {
                value: 10,
                message: NAME_MAX_LENGTH_MESSAGE,
              },
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
                return value === password || PASSWORD_MISMATCH_MESSAGE;
              },
            }}
            errors={errors}
          />
          <CommonButton
            type="submit"
            disabled={buttonDisabled}
            isActive={!buttonDisabled}
            variant="primary"
            className={`mb-7 w-full`}
          >
            가입하기
          </CommonButton>
        </form>
        <AuthSwitchPrompt href="/login" auth="로그인" />
      </AuthContainer>
    </>
  );
};

export default SignUpPage;
