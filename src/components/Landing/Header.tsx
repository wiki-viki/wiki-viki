import { useRouter } from 'next/router';
import Image from 'next/image';
import CursorImage from '@/../public/image/LandingPage/Section2/cursor-image.png';
import { useStore } from '@/store/useStore';
import { useAuthStore } from '@/store/userAuthStore';
import { RisingMotion } from '@/components/common/Motion'

const Header = () => {
  const router = useRouter();
  const isLogin = useStore(useAuthStore, (state) => {
    return state.isLogin;
  });
  const user = useStore(useAuthStore, (state) => {
    return state.user;
  });

  const handleButton = () => {
    if (isLogin && user?.code) {
      router.push(`/wiki/${user.code}`);
    } else {
      router.push('/login');
    }
  };

  return (
    <section className="relative bg-grayscale-100">
      <section>
        <div className="flex h-[654px] flex-col items-center gap-10 pt-[130px]">
          <h1 className="text-center text-[40px] font-light leading-[46px] text-grayscale-500 md:text-[60px] md:leading-[102px]">
            남들이 만드는
            <br />
            <strong className="text-[60px] font-bold leading-[69px] md:text-[90px]">
              나만의 위키
            </strong>
          </h1>
          <button
            type="button"
            onClick={handleButton}
            className="center transition-300 h-[54px] w-[169px] rounded-2xl bg-grayscale-500 px-5 py-2.5 text-xl-semibold text-white hover:bg-primary-green-300"
          >
            위키 만들기
          </button>
        </div>
      </section>

      <div className="absolute left-1/2 top-[47%] z-10 -translate-x-1/2 md:top-[44%]">
        <RisingMotion>
          <div className="relative h-[398px] w-[336px] md:h-[590px] md:w-[498px]">
            <Image src={CursorImage} alt="content" fill sizes="auto" placeholder="blur" />
          </div>
        </RisingMotion>
      </div>
      <div className="relative mt-[-400px] h-[550px] rounded-t-[20%] bg-grayscale-500 [clip-path:ellipse(100%_50%_at_50%_100%)] md:mt-[-200px] md:h-[550px]"></div>
    </section>
  );
};

export default Header;
