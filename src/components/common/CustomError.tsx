import React from 'react';
import Lottie from 'lottie-react';
import { useRouter } from 'next/router';
import ErrorLottie from '../../../public/lottie/error.json';
import CommonButton from './CommonButton';

const CustomError = () => {
  const router = useRouter();

  const handleReLoadClick = () => {
    router.reload(); // 페이지 새로고침
  };

  return (
    <div className="center flex flex-col">
      <div className="center">
        <Lottie
          animationData={ErrorLottie}
          style={{ width: '180px', height: '180px', margin: '-10px' }}
        />
        <span className="text-2lg-bold ">문제가 발생하였습니다</span>
      </div>
      <CommonButton
        onClick={handleReLoadClick}
        className="ml-6 border-secondary-red-200 text-secondary-red-200 hover:bg-secondary-red-200/20"
        variant="secondary"
      >
        페이지 새로고침하기
      </CommonButton>
    </div>
  );
};

export default CustomError;
