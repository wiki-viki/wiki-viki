import { useForm } from 'react-hook-form';
import {
  REQUIRED_MESSAGE,
  PASSWORD_MIN_LENGTH_MESSAGE,
  PASSWORD_MISMATCH_MESSAGE,
} from '@/constants/messages';
import { Label, Input } from '../common/Form';
import CommonButton from '../common/CommonButton';

const ChangePassWord = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm({ mode: 'onBlur' });

  const onSubmit = handleSubmit((data) => {
    console.log('submitting');
    console.log(data);
  });

  const buttonDisabled = !isValid;

  return (
    <section>
      <form onSubmit={onSubmit}>
        <Label label="비밀번호 변경" className="label mb-2.5 block" />
        <div className="mb-4 flex flex-col gap-2">
          <Input
            id="currentPassWord"
            type="password"
            placeholder="기존 비밀번호"
            className={`input ${errors.currentPassWord ? 'bg-secondary-red-100' : ''}`}
            {...register('currentPassWord', {
              required: REQUIRED_MESSAGE,
              minLength: {
                value: 8,
                message: PASSWORD_MIN_LENGTH_MESSAGE,
              },
            })}
          />
          {errors.currentPassWord && (
            <span className="errorMessage">{errors.currentPassWord.message as string}</span>
          )}
          <Input
            id="newPassWord"
            type="password"
            placeholder="새 비밀번호"
            className={`input ${errors.newPassWord ? 'bg-secondary-red-100' : ''}`}
            {...register('newPassWord', {
              required: REQUIRED_MESSAGE,
              minLength: {
                value: 8,
                message: PASSWORD_MIN_LENGTH_MESSAGE,
              },
            })}
          />
          {errors.newPassWord && (
            <span className="errorMessage">{errors.newPassWord.message as string}</span>
          )}
          <Input
            id="confirmPassword"
            type="password"
            placeholder="새 비밀번호 확인"
            className="input"
            {...register('confirmPassword', {
              required: REQUIRED_MESSAGE,
              minLength: {
                value: 8,
                message: PASSWORD_MIN_LENGTH_MESSAGE,
              },
              validate: (value) => {
                return value === getValues('newPassWord') || PASSWORD_MISMATCH_MESSAGE;
              },
            })}
          />
          {errors.confirmPassword && (
            <span className="errorMessage">{errors.confirmPassword.message as string}</span>
          )}
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
      <div className="my-8 h-px w-full bg-grayscale-100"></div>
    </section>
  );
};

export default ChangePassWord;
