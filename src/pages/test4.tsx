import { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Logo from '@/../public/image/logo-background.png';
import CommonButton from '@/components/common/CommonButton';
import wikivikiIcon from '@/../public/image/wikiviki-clover.png';

interface Clover {
  id: number;
  top: number;
  left: number;
  opacity: number;
  size: number;
}

const MAX_CLOVERS = 50; // 최대 클로버 개수 증가
const CLOVER_CREATION_INTERVAL = 300; // 클로버 생성 간격을 200ms로 줄임

const Custom500Error: React.FC = () => {
  const router = useRouter();
  const [clovers, setClovers] = useState<Clover[]>([]);

  useEffect(() => {
    let animationFrameId: number;
    let lastTime = 0;
    let cloverCounter = 0;

    const animate = (time: number) => {
      if (time - lastTime > CLOVER_CREATION_INTERVAL) {
        if (clovers.length < MAX_CLOVERS) {
          setClovers((prevClovers) => {
            return [
              ...prevClovers,
              {
                id: cloverCounter++,
                top: Math.floor(Math.random() * -100),
                left: Math.floor(Math.random() * window.innerWidth),
                opacity: 1,
                size: Math.random() * 10 + 10, // 크기를 10-20px 사이로 랜덤하게 설정
              },
            ];
          });
        }
        lastTime = time;
      }

      setClovers((prevClovers) => {
        return prevClovers
          .map((clover) => {
            return {
              ...clover,
              top: clover.top + 1 + Math.random(), // 떨어지는 속도를 랜덤하게 설정
              opacity: Math.max(clover.opacity - 0.002, 0), // 투명도 감소 속도를 줄임
            };
          })
          .filter((clover) => {
            return clover.top < window.innerHeight && clover.opacity > 0;
          });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const memoizedClovers = useMemo(() => {
    return clovers.map((clover) => {
      return (
        <Image
          key={clover.id}
          src={wikivikiIcon}
          alt="wikiviki"
          width={clover.size}
          height={clover.size}
          style={{
            position: 'absolute',
            top: `${clover.top}px`,
            left: `${clover.left}px`,
            opacity: clover.opacity,
          }}
        />
      );
    });
  }, [clovers]);

  return (
    <div className="center relative h-[800px] flex-col pt-36">
      <div className="absolute inset-0 overflow-hidden">{memoizedClovers}</div>
      <div className="absolute -z-10 opacity-10">
        <Image src={Logo} alt="이미지" width={1920} height={1080} /> {/* 크기 직접 설정 */}
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
    </div>
  );
};

export default Custom500Error;
