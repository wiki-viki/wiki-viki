import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import CommonButton from '@/components/common/CommonButton';
import { Label } from '@/components/common/Form';
import LockerIcon from '../../../public/svg/locker_Icon.svg';
import quizMockData from '../../../public/quizMockData.json';

const modalFirstText = `text-md-regular text-grayscale-400`;
const modalSecondText = `text-xs-regular text-grayscale-400`;

type QuizModalTempleteProps = {
  onClose: (value: void) => void;
};

const QuizModalTemplete = ({ onClose }: QuizModalTempleteProps) => {
  const [answer, setAnswer] = useState<string>('');
  const [isWrongAnswer, setIsWrongAnswer] = useState(false);

  const handleAnswerInputChange = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    setAnswer(value);
  };

  const handleAnswerInputKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleButtonClick();
    }
  };

  const handleButtonClick = () => {
    if (quizMockData.securityAnswer !== answer) {
      setIsWrongAnswer(true);
      setTimeout(() => {
        setIsWrongAnswer(false);
      }, 3000);
    } else {
      alert('good!!');
      onClose();
    }
  };

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
        label={quizMockData.securityQuestion}
      ></Label>

      <input
        id="quizInput"
        name="quizInput"
        className={`mb-2 h-[45px] w-full rounded-10 bg-grayscale-100 pl-4 ${isWrongAnswer && 'bg-secondary-red-100 focus:border-secondary-red-200'} outline-none focus:border-2 focus:border-primary-green-200`}
        placeholder="답안을 입력해주세요"
        onChange={handleAnswerInputChange}
        onKeyDown={handleAnswerInputKeyDown}
      />

      {isWrongAnswer && (
        <p className="text-xs-regular text-secondary-red-200">
          정답이 아닙니다. 다시 시도해 주세요.
        </p>
      )}

      <CommonButton variant="primary" className="mt-8" onClick={handleButtonClick}>
        확인
      </CommonButton>

      <div className="mx-auto mt-5 text-center">
        <p className={modalSecondText}>위키비키는 지인들과 함께하는 즐거운 공간입니다.</p>
        <p className={modalSecondText}>지인에게 상처를 주지 않도록 작성해주세요.</p>
      </div>
    </>
  );
};

export default QuizModalTemplete;
