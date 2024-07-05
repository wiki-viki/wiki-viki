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
  NAME_MAX_LENGTH_MESSAGE,
  INVALID_EMAIL_MESSAGE,
  PASSWORD_MIN_LENGTH_MESSAGE,
  PASSWORD_MISMATCH_MESSAGE,
} from '@/constants/messages';
import 'react-toastify/dist/ReactToastify.css';
import { StyledToastContainer } from '@/styles/ToastStyle';
import ToastSelect from '@/components/common/ToastSelect';
import Logo from '@/../public/svg/wiki-viki-logo.svg';
import { useSignUpData } from '@/lib/apis/Auth';

const emailPattern = {
  value: EMAIL_REGEX,
  message: INVALID_EMAIL_MESSAGE,
};

const SignUpPage = () => {
  const router = useRouter();
  const { isError, statusCode, mutation: getSignupData } = useSignUpData();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<DefaultFormData>({ mode: 'onChange' });

  const password = watch('password');
  const buttonDisabled = !isValid;

  const onSubmit = handleSubmit(async (formData) => {
    const requestData = {
      data: formData,
    };
    const response = await getSignupData(requestData);

    if (response?.status === 201) {
      ToastSelect({ type: 'check', message: '가입이 완료되었습니다' });
      router.push('/login');
    }
  });

  useEffect(() => {
    if (statusCode === 400) {
      ToastSelect({ type: 'error', message: isError });
    } else if (statusCode) {
      ToastSelect({
        type: 'error',
        message: '네트워크 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
      });
    }
  }, [isError, statusCode]);

  return (
    <>
      <Container className="mt-[50px]">
        <div className="center mb-[40px] flex-col gap-4">
          <Link href="/" rel="preload">
            <Logo width={250} height={70} />
          </Link>
          <SwitchPrompt href="/login" auth="로그인" />
        </div>
        <form onSubmit={onSubmit}>
          <InputWithLabel
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
          <InputWithLabel
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
          <InputWithLabel
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
      </Container>
      <StyledToastContainer limit={1} transition={Zoom} />
    </>
  );
};

export default SignUpPage;
