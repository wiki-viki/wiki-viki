import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { isAxiosError } from 'axios';
import CommonButton from '@/components/common/CommonButton';
import { Input, Label } from '@/components/common/Form';
import { createPing } from '@/lib/apis/profile/profileApi.api';
import { CodeType } from '@/types/apiType';
import LockerIcon from '../../../public/svg/locker_Icon.svg';
import ToastSelect from '../common/ToastSelect';

const modalFirstText = `text-md-regular text-grayscale-400`;
const modalSecondText = `text-xs-regular text-grayscale-400`;

type QuizModalProps = {
  question: string;
  onClose: (value: void) => void;
  setEditingMode: (value: void) => void;
  code: CodeType;
  setAnswer: (value: string) => void;
  setRenewalTime: (value: boolean) => void;
  renewalTime: boolean;
};

type IForm = {
  securityAnswer: string;
};

const QuizModalTemplete = ({
  question,
  onClose,
  setEditingMode,
  code,
  setAnswer,
  setRenewalTime,
  renewalTime,
}: QuizModalProps) => {
  const {
    register,
    handleSubmit,
    setFocus,
    setError,
    formState: { errors },
  } = useForm<IForm>({
    mode: 'onSubmit',
  });

  const handleRenewalTime = () => {
    setRenewalTime(!renewalTime);
  };

  const handleSubmitData: SubmitHandler<IForm> = async (data) => {
    try {
      await createPing(code, data);
      setEditingMode();
      setAnswer(data.securityAnswer);
      handleRenewalTime();
      onClose();
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        if (error.response?.status === 403) {
          ToastSelect({ type: 'error', message: error.response?.data.message });
          onClose();
        } else {
          setError('securityAnswer', {
            type: 'required',
            message: '정답이 아닙니다. 다시 시도해 주세요.',
          });
        }
      } else {
        {
          setError('securityAnswer', {
            type: 'required',
            message: '예상치 못한 오류가 발생하였습니다. ',
          });
        }
      }
    }
  };

  useEffect(() => {
    return setFocus('securityAnswer');
  }, [setFocus]);

  return (
    <>
      <LockerIcon className="mx-auto mb-3 mt-5" />
      <div className="mx-auto mb-9 text-center">
        <p className={modalFirstText}>다음 퀴즈를 맞추고</p>
        <p className={modalFirstText}>위키를 작성해보세요.</p>
      </div>

      <Label
        htmlFor="quizInput"
        className="mb-3 text-2lg-semibold text-grayscale-500"
        label={question}
      ></Label>

      <form onSubmit={handleSubmit(handleSubmitData)}>
        <Input
          type="text"
          id="quizInput"
          className={`mb-2 h-[45px] w-full rounded-10 bg-grayscale-100 pl-4 ${
            errors.securityAnswer ? 'bg-secondary-red-100 focus:border-secondary-red-200' : ''
          } outline-none focus:border-2 focus:border-primary-green-200`}
          placeholder="답안을 입력해주세요"
          {...register('securityAnswer', { required: '답안을 입력해주세요' })}
        />

        {errors.securityAnswer && (
          <p className="text-xs-regular text-secondary-red-200">{errors.securityAnswer.message}</p>
        )}

        <CommonButton variant="primary" className="mt-8 w-full" type="submit">
          확인
        </CommonButton>
      </form>

      <div className="mx-auto mt-5 text-center">
        <p className={modalSecondText}>위키비키는 지인들과 함께하는 즐거운 공간입니다.</p>
        <p className={modalSecondText}>지인에게 상처를 주지 않도록 작성해주세요.</p>
      </div>
    </>
  );
};

export default QuizModalTemplete;
