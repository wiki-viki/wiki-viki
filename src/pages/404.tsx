import Lottie from 'lottie-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Logo from '@/../public/image/logo-background.png';
import CommonButton from '@/components/common/CommonButton';
import ErrorLottie from '@/../public/lottie/404.json';

const buttonClassName =
  'border-secondary-blue-100 text-secondary-blue-100 hover:bg-secondary-blue-100/10';

const Custom404Error = () => {
  const router = useRouter();

  return (
    <div className="center relative flex-col pt-36">
      <div className="absolute inset-0 -z-10 opacity-20">
        <Image src={Logo} alt="이미지" fill objectFit="cover" />
      </div>
      <Lottie animationData={ErrorLottie} style={{ width: '164px' }} />
      <span className="mt-4 text-2xl-bold">
        <span className="text-secondary-blue-100">페이지</span>를 찾을 수 없습니다
      </span>
      <div className="my-10 border-l-4 border-l-secondary-blue-100 pl-4 text-lg-medium">
        <p>존재하지 않거나, 사용할 수 없는 페이지입니다.</p>
        <p>입력하신 주소를 다시 한 번 확인해주세요.</p>
      </div>
      <div className="flex gap-4">
        <CommonButton
          onClick={() => {
            return router.back();
          }}
          className={buttonClassName}
          variant="secondary"
        >
          이전 페이지로 이동
        </CommonButton>
        <Link href="/">
          <CommonButton className={buttonClassName} variant="secondary">
            메인 페이지로 이동
          </CommonButton>
        </Link>
      </div>
    </div>
  );
};

export default Custom404Error;
