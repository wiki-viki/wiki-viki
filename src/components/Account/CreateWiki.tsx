import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { Zoom } from 'react-toastify';
import {
  REQUIRED_MESSAGE,
  WIKI_QUESTION_MIN_lENGTH_MESSAGE,
  WIKI_ANSWER_MIN_lENGTH_MESSAGE,
} from '@/constants/messages';
import { questions } from '@/constants/questions';
import { Container, InputWithLabel } from '@/components/common/Form';
import 'react-toastify/dist/ReactToastify.css';
import { StyledToastContainer } from '@/styles/ToastStyle';
import ToastSelect from '@/components/common/ToastSelect';
import getCreateWikiApi from '@/lib/apis/Auth/createWikiApi';
import CommonButton from '../common/CommonButton';

const CreateWiki = () => {
  const { isError, statusCode, axiosFetch } = getCreateWikiApi();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({ mode: 'onBlur' });

  const handleRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    const randomQuestion = questions[randomIndex];
    setValue('securityQuestion', randomQuestion);
  };

  const onSubmit = handleSubmit(async (formData) => {
    const requestData = {
      data: {
        securityQuestion: formData.securityQuestion,
        securityAnswer: formData.securityAnswer,
      },
    };
    const response = await axiosFetch(requestData);
    if (response?.status === 200) {
      ToastSelect({ type: 'check', message: '위키가 생성되었습니다' });
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
      <Container title="위키 생성하기">
        <form onSubmit={onSubmit}>
          <InputWithLabel
            id="securityQuestion"
            name="securityQuestion"
            label="질문을 생성해주세요"
            type="text"
            placeholder="질문을 생성해주세요"
            register={register}
            rules={{
              required: REQUIRED_MESSAGE,
              minLength: {
                value: 1,
                message: WIKI_QUESTION_MIN_lENGTH_MESSAGE,
              },
            }}
            errors={errors}
          />
          <InputWithLabel
            id="securityAnswer"
            name="securityAnswer"
            label="답을 입력해주세요"
            type="text"
            placeholder="답을 입력해주세요"
            register={register}
            rules={{
              required: REQUIRED_MESSAGE,
              minLength: {
                value: 1,
                message: WIKI_ANSWER_MIN_lENGTH_MESSAGE,
              },
            }}
            errors={errors}
          />

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
      </Container>
      <StyledToastContainer limit={1} transition={Zoom} />
    </>
  );
};

export default CreateWiki;
