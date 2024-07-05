import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { Zoom } from 'react-toastify';
import { useRouter } from 'next/router';
import {
  REQUIRED_MESSAGE,
  WIKI_QUESTION_MIN_lENGTH_MESSAGE,
  WIKI_ANSWER_MIN_lENGTH_MESSAGE,
} from '@/constants/messages';
import { useAuthStore } from '@/store/userAuthStore';
import { questions } from '@/constants/questions';
import { Container, InputWithLabel } from '@/components/common/Form';
import 'react-toastify/dist/ReactToastify.css';
import { StyledToastContainer } from '@/styles/ToastStyle';
import ToastSelect from '@/components/common/ToastSelect';
import { useCreateWikiApi } from '@/lib/apis/Auth';
import CommonButton from '../common/CommonButton';

const CreateWiki = () => {
  const router = useRouter();
  const { isError, statusCode, mutation: getCreateWikiApi } = useCreateWikiApi();
  const { saveUserProfile } = useAuthStore();
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
    const response = await getCreateWikiApi(requestData);
    if (response?.status === 201) {
      saveUserProfile(response?.data);
      ToastSelect({ type: 'check', message: '위키가 생성되었습니다' });
      router.push(`/wiki/${response?.data?.code}`);
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
      <div className="center">
        <div className="center mt-[50px] w-[335px] flex-col rounded-lg border border-grayscale-100 bg-primary-green-100 p-4 text-lg-regular text-grayscale-500 md:mt-[100px] lg:w-[400px]">
          <p>질문과 답을 입력하고 위키를 생성하세요</p>
          <p>질문과 답은 한 번만 등록할 수 있습니다</p>
        </div>
      </div>
      <Container title="위키 생성하기" className="mt-[30px] md:mt-[50px]">
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
