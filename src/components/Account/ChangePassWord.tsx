import { useForm } from 'react-hook-form';
import {
  REQUIRED_MESSAGE,
  PASSWORD_MIN_LENGTH_MESSAGE,
  PASSWORD_MISMATCH_MESSAGE,
} from '@/constants/messages';
import useBoolean from '@/hooks/useBoolean';
import UnLockIcon from '@/components/Auth/UnLock';
import LockIcon from '@/components/Auth/Lock';
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
  
  const { value: showCurrentPassword, handleToggle: toggleCurrentPassword } = useBoolean();
  const { value: showNewPassword, handleToggle: toggleNewPassword } = useBoolean();
  const { value: showConfirmPassword, handleToggle: toggleConfirmPassword } = useBoolean();
  
  return (
    <section>
      <form onSubmit={onSubmit}>
        <Label label="비밀번호 변경" className="label mb-2.5 block" />

        {/* 기존 비밀번호 필드 */}
        <div className="mb-4 flex flex-col gap-2">
          <div className="relative">
            <Input
              id="currentPassWord"
              type={showCurrentPassword ? 'text' : 'password'}
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
            <span
              className={`checkPassword ${errors.currentPassWord ? 'top-1/3' : ''}`}
              onClick={toggleCurrentPassword}
            >
              {showCurrentPassword ? <UnLockIcon /> : <LockIcon />}
            </span>
            {errors.currentPassWord && (
              <span className="errorMessage">{errors.currentPassWord.message as string}</span>
            )}
          </div>

          {/* 새 비밀번호 필드 */}
          <div className="relative">
            <Input
              id="newPassWord"
              type={showNewPassword ? 'text' : 'password'}
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
            <span
              className={`checkPassword ${errors.newPassWord ? 'top-1/3' : ''}`}
              onClick={toggleNewPassword}
            >
              {showNewPassword ? <UnLockIcon /> : <LockIcon />}
            </span>
            {errors.newPassWord && (
              <span className="errorMessage">{errors.newPassWord.message as string}</span>
            )}
          </div>

          {/* 새 비밀번호 확인 필드 */}
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="새 비밀번호 확인"
              className={`input ${errors.confirmPassword ? 'bg-secondary-red-100' : ''}`}
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
            <span
              className={`checkPassword ${errors.confirmPassword ? 'top-1/3' : ''}`}
              onClick={toggleConfirmPassword}
            >
              {showConfirmPassword ? <UnLockIcon /> : <LockIcon />}
            </span>
            {errors.confirmPassword && (
              <span className="errorMessage">{errors.confirmPassword.message as string}</span>
            )}
          </div>
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
