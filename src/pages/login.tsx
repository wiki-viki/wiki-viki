import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { Zoom } from 'react-toastify';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Container, InputWithLabel, SwitchPrompt } from '@/components/common/Form';
import { DefaultFormData } from '@/types/authFormType';
import CommonButton from '@/components/common/CommonButton';
import { EMAIL_REGEX } from '@/constants/regex';
import {
  REQUIRED_MESSAGE,
  INVALID_EMAIL_MESSAGE,
  PASSWORD_MIN_LENGTH_MESSAGE,
} from '@/constants/messages';
import { useAuthStore } from '@/store/userAuthStore';
import 'react-toastify/dist/ReactToastify.css';
import { StyledToastContainer } from '@/styles/ToastStyle';
import ToastSelect from '@/components/common/ToastSelect';
import Logo from '@/../public/svg/wiki-viki-logo.svg';
import { getLoginData } from '@/lib/apis/Auth';

const emailPattern = {
  value: EMAIL_REGEX,
  message: INVALID_EMAIL_MESSAGE,
};

const LoginPage = () => {
  const router = useRouter();
  const { isError, statusCode, axiosFetch } = getLoginData();
  const { saveUser } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<DefaultFormData>({ mode: 'onChange' });

  const onSubmit = handleSubmit(async (formData) => {
    const requestData = {
      data: formData,
    };
    const response = await axiosFetch(requestData);
    if (response?.data?.accessToken) {
      saveUser({ id: response?.data?.user?.id, name: response?.data?.user?.name });
      router.push('/');
    }
  });

  const buttonDisabled = !isValid;

  useEffect(() => {
    if (statusCode === 400) {
      ToastSelect({ type: 'error', message: isError });
    } else if (statusCode) {
      ToastSelect({
        type: 'error',
        message: '예상치 못한 오류가 발생했습니다. 관리자에게 문의 바랍니다.',
      });
    }
  }, [isError, statusCode]);

  return (
    <>
      <Container className="sm:mt-[130px] md:mt-[150px]">
        <div className="center mb-[40px] flex-col gap-4">
          <Link href="/" rel="preload">
            <Logo width={250} height={70} />
          </Link>
          <SwitchPrompt href="/signup" auth="회원가입" />
        </div>
        <form onSubmit={onSubmit}>
          <InputWithLabel
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
          <InputWithLabel
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
            className={`mb-7 h-[50px] w-full`}
          >
            이메일로 로그인
          </CommonButton>
        </form>
      </Container>
      <StyledToastContainer limit={1} transition={Zoom} />
    </>
  );
};

export default LoginPage;
