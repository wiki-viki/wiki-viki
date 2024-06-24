import { useForm } from 'react-hook-form';
import {
  REQUIRED_MESSAGE,
  WIKI_QUESTION_MIN_lENGTH_MESSAGE,
  WIKI_ANSWER_MIN_lENGTH_MESSAGE,
} from '@/constants/messages';
import { Label, Input } from '../common/Form';
import CommonButton from '../common/CommonButton';

const CreateWiki = () => {
  const {
    register,
    handleSubmit,
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
        <Label label="위키 생성하기" className="label mb-2.5 block" />
        <div className="mb-4 flex flex-col gap-2">
          <Input
            id="question"
            placeholder="질문을 생성해주세요"
            className="input"
            {...register('question', {
              required: REQUIRED_MESSAGE,
              minLength: {
                value: 1,
                message: WIKI_QUESTION_MIN_lENGTH_MESSAGE,
              },
            })}
          />
          {errors.question && <span className="errorMessage">{errors?.question.message as string}</span>}
          <Input
            id="answer"
            placeholder="답을 입력해주세요"
            className="input"
            {...register('answer', {
              required: REQUIRED_MESSAGE,
              minLength: {
                value: 1,
                message: WIKI_ANSWER_MIN_lENGTH_MESSAGE,
              },
            })}
          />
          {errors.answer && <span className="errorMessage">{errors?.answer.message as string}</span>}
        </div>
        <div className="flex justify-end">
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
