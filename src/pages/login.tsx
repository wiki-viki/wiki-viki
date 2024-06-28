import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { AuthContainer, AuthSwitchPrompt, AuthInputWithLabel } from '@/components/Auth';
import { DefaultFormData } from '@/types/authFormType';
import CommonButton from '@/components/common/CommonButton';
import { EMAIL_REGEX } from '@/constants/regex';
import {
  REQUIRED_MESSAGE,
  INVALID_EMAIL_MESSAGE,
  PASSWORD_MIN_LENGTH_MESSAGE,
} from '@/constants/messages';
import useAxiosFetch from '@/hooks/useAxiosFetch';
import { useUserStore } from '@/store/userStore';

const emailPattern = {
  value: EMAIL_REGEX,
  message: INVALID_EMAIL_MESSAGE,
};

const LoginPage = () => {
  const { saveUser } = useUserStore();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<DefaultFormData>({ mode: 'onChange' });

  const { isLoading, isError, statusCode, axiosFetch } = useAxiosFetch({
    skip: true,
    options: {
      method: 'post',
      url: 'auth/signin',
    },
    includeAuth: true,
  });

  const onSubmit = handleSubmit(async (formData) => {
    const requestData = {
      data: formData,
    };
    const response = await axiosFetch(requestData);
    saveUser({ id: response.data.user.id, name: response.data.user.name });
    if (response?.data?.accessToken) {
      router.push('/');
    }
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

  return (
    <>
      {isLoading && <h1 className="center">로딩중</h1>}
      <AuthContainer title="로그인">
        {isError && <p className="center">{errorMessage()}</p>}
        <form onSubmit={onSubmit}>
          <AuthInputWithLabel
            id="email"
            name="email"
            label="이메일"
            type="text"
            placeholder="이메일"
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
          <CommonButton
            type="submit"
            disabled={buttonDisabled}
            isActive={!buttonDisabled}
            variant="primary"
            className={`mb-7 w-full`}
          >
            이메일로 로그인
          </CommonButton>
        </form>
        <AuthSwitchPrompt href="/signup" auth="회원가입" />
      </AuthContainer>
    </>
  );
};

export default LoginPage;
