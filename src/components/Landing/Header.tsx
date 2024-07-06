import { useRouter } from 'next/router';
import Image from 'next/image';
import CursorImage from '@/../public/image/LandingPage/Section2/cursor-image.png';
import { useStore } from '@/store/useStore';
import { useAuthStore } from '@/store/userAuthStore';
import { RisingMotion } from '@/components/common/Motion';

const Header = () => {
  const router = useRouter();
  const isLogin = useStore(useAuthStore, (state) => {
    return state.isLogin;
  });
  const user = useStore(useAuthStore, (state) => {
    return state.user;
  });
  const userProfile = useStore(useAuthStore, (state) => {
    return state.userProfile;
  });

  const handleCreateWikiButton = () => {
    if (userProfile?.code || user?.profile?.code) {
      router.push(`/wiki/${userProfile?.code || user?.profile?.code}`);
    } else if (!userProfile?.code && isLogin) {
      router.push('/mypage');
    } else {
      router.push('/login');
    }
  };

  const handleBrowsingButton = () => {
    router.push('/wikilist');
  };

  return (
    <section className="relative bg-grayscale-100">
      <section className="flex flex-col xl:flex-row xl:items-center xl:justify-center xl:gap-[200px]">
        <div className="flex h-[654px] flex-col items-center justify-center gap-10 xl:h-lvh xl:items-start xl:pt-0">
          <h1 className="text-center text-[40px] font-light leading-[46px] text-grayscale-500 md:text-[60px] md:leading-[102px] xl:text-start">
            남들이 만드는
            <br />
            <strong className="text-[60px] font-bold leading-[69px] md:text-[90px]">
              나만의 위키
            </strong>
          </h1>
          <p className="hidden xl:block xl:text-start xl:text-[25px] xl:font-light xl:text-grayscale-300">
            함께 작성하는 우리의 지식 저장소
            <br />
            누구나 쉽게 접근하고 공유할 수 있는 플랫폼
          </p>
          <div className="center gap-5">
            <button
              type="button"
              onClick={handleCreateWikiButton}
              className="center transition-300 h-[54px] w-[160px] rounded-2xl bg-grayscale-500 px-5 py-2.5 text-xl-semibold text-white hover:bg-primary-green-300 md:h-[60px] md:w-[180px]"
            >
              위키 참여하기
            </button>
            <button
              type="button"
              onClick={handleBrowsingButton}
              className="center transition-300 h-[54px] w-[160px] rounded-2xl bg-grayscale-500 px-5 py-2.5 text-xl-semibold text-white hover:bg-primary-green-300 md:h-[60px] md:w-[180px]"
            >
              둘러보기
            </button>
          </div>
        </div>

        <div className="absolute left-1/2 top-[57%] z-10 -translate-x-1/2 md:top-1/2 xl:relative xl:left-0 xl:top-0 xl:translate-x-0">
          <RisingMotion>
            <div className="relative h-[398px] w-[336px] md:h-[590px] md:w-[498px]">
              <Image
                src={CursorImage}
                alt="cursor image"
                fill
                sizes="(min-width: 769px) 498px, (min-width: 480px) 336px, 336px"
                placeholder="blur"
                priority={true}
              />
            </div>
          </RisingMotion>
        </div>
      </section>

      <div className="relative mt-[-300px] h-[500px] rounded-t-[20%] bg-grayscale-500 [clip-path:ellipse(100%_50%_at_50%_100%)] md:h-[750px] xl:hidden"></div>
    </section>
  );
};

export default Header;
