import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { Zoom } from 'react-toastify';
import {
  REQUIRED_MESSAGE,
  PASSWORD_MIN_LENGTH_MESSAGE,
  PASSWORD_MISMATCH_MESSAGE,
} from '@/constants/messages';
import { Container, InputWithLabel } from '@/components/common/Form';
import 'react-toastify/dist/ReactToastify.css';
import { StyledToastContainer } from '@/styles/ToastStyle';
import ToastSelect from '@/components/common/ToastSelect';
import { useChangePasswordData } from '@/lib/apis/Auth';
import CommonButton from '../common/CommonButton';

const ChangePassWord = () => {
  const { isError, statusCode, mutation: getChangePasswordData } = useChangePasswordData();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm({ mode: 'onBlur' });

  const onSubmit = handleSubmit(async (formData) => {
    const requestData = {
      data: formData,
    };
    const response = await getChangePasswordData(requestData);
    if (response?.status === 200) {
      ToastSelect({ type: 'check', message: '비밀번호가 변경되었습니다' });
    }
  });

  const buttonDisabled = !isValid;

  useEffect(() => {
    (() => {
      if (statusCode === 400) {
        ToastSelect({ type: 'error', message: isError });
      } else if (statusCode) {
        ToastSelect({
          type: 'error',
          message: '예상치 못한 오류가 발생했습니다. 관리자에게 문의 바랍니다.',
        });
      }
    })();
  }, [isError, statusCode]);

  return (
    <>
      <Container title="비밀번호 변경" className="mt-[100px] md:mt-[150px]">
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <InputWithLabel
              id="currentPassword"
              name="currentPassword"
              label="비밀번호 변경"
              type="password"
              placeholder="비밀번호 변경"
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
              id="password"
              name="password"
              label="새 비밀번호"
              type="password"
              placeholder="새 비밀번호"
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
              label="새 비밀번호 확인"
              type="password"
              placeholder="새 비밀번호 확인"
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
          </div>
          <div className="flex justify-end">
            <CommonButton
              type="submit"
              disabled={buttonDisabled}
              isActive={!buttonDisabled}
              variant="primary"
            >
              변경하기
            </CommonButton>
          </div>
        </form>
      </Container>
      <StyledToastContainer limit={1} transition={Zoom} />
    </>
  );
};

export default ChangePassWord;
