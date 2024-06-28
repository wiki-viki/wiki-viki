import { useForm } from 'react-hook-form';
import {
  REQUIRED_MESSAGE,
  WIKI_QUESTION_MIN_lENGTH_MESSAGE,
  WIKI_ANSWER_MIN_lENGTH_MESSAGE,
} from '@/constants/messages';
import { questions } from '@/constants/questions';
import useAxiosFetch from '@/hooks/useAxiosFetch';
import { Label, Input } from '../common/Form';
import CommonButton from '../common/CommonButton';

const CreateWiki = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({ mode: 'onBlur' });

  const { isError, statusCode, axiosFetch } = useAxiosFetch({
    skip: true,
    options: {
      method: 'post',
      url: 'profiles',
    },
    includeAuth: true,
  });

  const onSubmit = handleSubmit(async (formData) => {
    const requestData = {
      data: {
        securityQuestion: formData.securityQuestion,
        securityAnswer: formData.securityAnswer,
      },
    };
    await axiosFetch(requestData);
  });

  const buttonDisabled = !isValid;

  const handleRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    const randomQuestion = questions[randomIndex];
    setValue('securityQuestion', randomQuestion);
  };

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
        <Label label="위키 생성하기" className="label mb-2.5 block" />
        <div className="mb-4 flex flex-col gap-2">
          <Input
            id="securityQuestion"
            type="text"
            placeholder="질문을 생성해주세요"
            className={`input ${errors.securityQuestion ? 'bg-secondary-red-100' : ''}`}
            {...register('securityQuestion', {
              required: REQUIRED_MESSAGE,
              minLength: {
                value: 1,
                message: WIKI_QUESTION_MIN_lENGTH_MESSAGE,
              },
            })}
          />
          {errors.securityQuestion && (
            <span className="errorMessage">{errors?.securityQuestion.message as string}</span>
          )}
          <Input
            id="securityAnswer"
            type="text"
            placeholder="답을 입력해주세요"
            className={`input ${errors.securityAnswer ? 'bg-secondary-red-100' : ''}`}
            {...register('securityAnswer', {
              required: REQUIRED_MESSAGE,
              minLength: {
                value: 1,
                message: WIKI_ANSWER_MIN_lENGTH_MESSAGE,
              },
            })}
          />
          {errors.securityAnswer && (
            <span className="errorMessage">{errors?.securityAnswer.message as string}</span>
          )}
        </div>
        <div className="flex justify-end">
          <CommonButton
            type="button"
            variant="primary"
            className="mr-3 bg-secondary-yellow-100 hover:bg-[#FFD700]"
            onClick={handleRandomQuestion}
          >
            질문 랜덤 생성
          </CommonButton>
          <CommonButton
            type="submit"
            disabled={buttonDisabled}
            isActive={!buttonDisabled}
            variant="primary"
          >
            생성하기
          </CommonButton>
        </div>
      </form>
    </section>
  );
};

export default CreateWiki;
