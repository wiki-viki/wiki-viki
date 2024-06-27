import { useForm } from 'react-hook-form';
import {
  REQUIRED_MESSAGE,
  PASSWORD_MIN_LENGTH_MESSAGE,
  PASSWORD_MISMATCH_MESSAGE,
} from '@/constants/messages';
import useBoolean from '@/hooks/useBoolean';
import UnLockIcon from '@/components/Auth/UnLock';
import LockIcon from '@/components/Auth/Lock';
import useAxiosFetch from '@/hooks/useAxiosFetch';
import { Label, Input } from '../common/Form';
import CommonButton from '../common/CommonButton';

const ChangePassWord = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm({ mode: 'onBlur' });
  
  const { isError, statusCode, axiosFetch } = useAxiosFetch({
    skip: true,
    options: {
      method: 'patch',
      url: 'users/me/password',
    },
    includeAuth: true
  })
  
  const onSubmit = handleSubmit(async (formData) => {
    const requestData = {
      data: formData,
    };
    await axiosFetch(requestData);
  });
  
  const buttonDisabled = !isValid;
  
  const { value: currentPassword, handleToggle: toggleCurrentPassword } = useBoolean();
  const { value: password, handleToggle: togglePassword } = useBoolean();
  const { value: passwordConfirmation, handleToggle: togglePasswordConfirmation } = useBoolean();
  
  const errorMessage = () => {
    if (statusCode === 400) {
      return isError;
    } else if (statusCode) {
      return `Error: ${statusCode}`;
    }
    return null;
  };

  return (
    <section>
      <form onSubmit={onSubmit}>
      {isError && <p className="center">{errorMessage()}</p>}
        <Label label="비밀번호 변경" className="label mb-2.5 block" />

        {/* 기존 비밀번호 필드 */}
        <div className="mb-4 flex flex-col gap-2">
          <div className="relative">
            <Input
              id="currentPassword"
              type={currentPassword ? 'text' : 'password'}
              placeholder="기존 비밀번호"
              className={`input ${errors.currentPassword ? 'bg-secondary-red-100' : ''}`}
              {...register('currentPassword', {
                required: REQUIRED_MESSAGE,
                minLength: {
                  value: 8,
                  message: PASSWORD_MIN_LENGTH_MESSAGE,
                },
              })}
            />
            <span
              className={`checkPassword ${errors.currentPassword ? 'top-1/3' : ''}`}
              onClick={toggleCurrentPassword}
            >
              {currentPassword ? <UnLockIcon /> : <LockIcon />}
            </span>
            {errors.currentPassword && (
              <span className="errorMessage">{errors.currentPassword.message as string}</span>
            )}
          </div>

          {/* 새 비밀번호 필드 */}
          <div className="relative">
            <Input
              id="password"
              type={password ? 'text' : 'password'}
              placeholder="새 비밀번호"
              className={`input ${errors.password ? 'bg-secondary-red-100' : ''}`}
              {...register('password', {
                required: REQUIRED_MESSAGE,
                minLength: {
                  value: 8,
                  message: PASSWORD_MIN_LENGTH_MESSAGE,
                },
              })}
            />
            <span
              className={`checkPassword ${errors.password ? 'top-1/3' : ''}`}
              onClick={togglePassword}
            >
              {password ? <UnLockIcon /> : <LockIcon />}
            </span>
            {errors.password && (
              <span className="errorMessage">{errors.password.message as string}</span>
            )}
          </div>

          {/* 새 비밀번호 확인 필드 */}
          <div className="relative">
            <Input
              id="passwordConfirmation"
              type={passwordConfirmation ? 'text' : 'password'}
              placeholder="새 비밀번호 확인"
              className={`input ${errors.passwordConfirmation ? 'bg-secondary-red-100' : ''}`}
              {...register('passwordConfirmation', {
                required: REQUIRED_MESSAGE,
                minLength: {
                  value: 8,
                  message: PASSWORD_MIN_LENGTH_MESSAGE,
                },
                validate: (value) => {
                  return value === getValues('password') || PASSWORD_MISMATCH_MESSAGE;
                },
              })}
            />
            <span
              className={`checkPassword ${errors.passwordConfirmation ? 'top-1/3' : ''}`}
              onClick={togglePasswordConfirmation}
            >
              {passwordConfirmation ? <UnLockIcon /> : <LockIcon />}
            </span>
            {errors.passwordConfirmation && (
              <span className="errorMessage">{errors.passwordConfirmation.message as string}</span>
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
