import { useEffect } from 'react';
import Link from 'next/link';
import router from 'next/router';
import CommonButton from '@/components/common/CommonButton';

const Custom500Error: React.FC = () => {
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
          <img src="/image/logo-background.png" alt="이미지" width={1920} height={1080} />
        </div>
        <span className="z-50 text-2xl-bold text-grayscale-500">
          죄송합니다. <span className="text-primary-green-300">시스템 오류</span>입니다
        </span>
        <div className="z-50 my-10 border-l-4 border-l-primary-green-300 pl-4 text-lg-medium text-grayscale-500">
          <p>현재 시스템 오류가 발생했습니다.</p>
          <p>다른 페이지에 접속하거나 나중에 다시 시도해주십시오.</p>
        </div>
        <div className="z-50 flex gap-4">
          <CommonButton
            onClick={() => {
              router.back();
            }}
            className="border-primary-green-200 text-primary-green-200 hover:bg-primary-green-200  hover:text-gray-50"
            variant="secondary"
          >
            이전 페이지로 이동
          </CommonButton>
          <Link href="/">
            <CommonButton
              className="border-primary-green-200 text-primary-green-200 hover:bg-primary-green-200 hover:text-gray-50"
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

export default Custom500Error;
