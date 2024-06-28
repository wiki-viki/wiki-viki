import Lottie from 'lottie-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Logo from '@/../public/image/logo-background.png';
import ErrorLottie from '@/../public/lottie/error.json';
import CommonButton from '@/components/common/CommonButton';

const Custom500Error = () => {
  const router = useRouter();

  return (
    <div className="center relative flex-col py-14">
      <div className="absolute inset-0 -z-10 opacity-20">
        <Image src={Logo} alt="이미지" fill objectFit="cover" />
      </div>
      <Lottie animationData={ErrorLottie} style={{ width: '180px', height: '180px' }} />
      <span className="text-2xl-bold ">
        죄송합니다. <span className="text-secondary-red-200">시스템 오류</span>입니다
      </span>
      <div className="my-10 border-l-4 border-l-secondary-red-200 pl-4 text-lg-medium">
        <p>현재 시스템 오류가 발생했습니다.</p>
        <p>다른 페이지에 접속하거나 나중에 다시 시도해주십시오.</p>
      </div>
      <div className="flex gap-4">
        <CommonButton
          onClick={() => {
            return router.back();
          }}
          className=" border-secondary-red-200 text-secondary-red-200 hover:bg-secondary-red-200/10"
          variant="secondary"
        >
          이전 페이지로 이동
        </CommonButton>
        <Link href="/">
          <CommonButton
            className=" border-secondary-red-200 text-secondary-red-200 hover:bg-secondary-red-200/10"
            variant="secondary"
          >
            메인 페이지로 이동
          </CommonButton>
        </Link>
      </div>
    </div>
  );
};

export default Custom500Error;
