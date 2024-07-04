import { useEffect } from 'react';
import Link from 'next/link';
import router from 'next/router';
import Image from 'next/image';
import Lottie from 'lottie-react';
import CommonButton from '@/components/common/CommonButton';
import ErrorLottie from '@/../public/lottie/404.json';

interface CustomErrorProps {
  type: '404' | '500';
}

const CustomError: React.FC<CustomErrorProps> = ({ type }) => {
  useEffect(() => {
    // 바닐라 JavaScript 코드 실행
    import('@/styles/error.mjs').then((module) => {
      module.startAnimation();
    });

    return () => {
      // 컴포넌트가 언마운트될 때 애니메이션 중지
      import('@/styles/error.mjs').then((module) => {
        module.stopAnimation();
      });
    };
  }, []);

  return (
    <>
      <div className="center relative h-[800px] flex-col pt-36">
        <div className="absolute inset-0 overflow-hidden" id="clovers-container"></div>
        <div className="absolute -z-10 opacity-10">
          <Image src="/image/logo-background.png" alt="이미지" width={1920} height={1080} />
        </div>
        {type === '404' ? (
          <Lottie animationData={ErrorLottie} style={{ width: '300px', height: '200px' }} />
        ) : (
          <></>
        )}
        <span className="z-50 text-2xl-bold text-grayscale-500">
          {type === '404' ? (
            <>
              죄송합니다. <span className="text-primary-green-300">페이지를 찾을 수 없습니다.</span>
            </>
          ) : (
            <>
              죄송합니다. <span className="text-primary-green-300">시스템 오류</span>입니다
            </>
          )}
        </span>
        <div className="z-50 my-10 border-l-4 border-l-primary-green-300 pl-4 text-lg-medium text-grayscale-500">
          {type === '404' ? (
            <>
              <p>존재하지 않거나, 사용할 수 없는 페이지입니다.</p>
              <p>입력하신 주소를 다시 한 번 확인해주세요.</p>
            </>
          ) : (
            <>
              <p>현재 시스템 오류가 발생했습니다.</p>
              <p>다른 페이지에 접속하거나 나중에 다시 시도해주십시오.</p>
            </>
          )}
        </div>
        <div className="z-50 flex gap-4">
          <CommonButton
            onClick={() => {
              router.back();
            }}
            className=" hover:bg-primary-green-200  hover:text-gray-50"
            variant="secondary"
          >
            이전 페이지로 이동
          </CommonButton>
          <Link href="/">
            <CommonButton
              className=" hover:bg-primary-green-200 hover:text-gray-50"
              variant="secondary"
            >
              메인 페이지로 이동
            </CommonButton>
          </Link>
        </div>
        <div className="absolute inset-x-0 bottom-0 z-10 h-[300px] bg-gradient-to-t from-white to-transparent"></div>
      </div>
    </>
  );
};

export default CustomError;
