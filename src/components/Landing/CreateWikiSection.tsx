import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useStore } from '@/store/useStore';
import { useAuthStore } from '@/store/userAuthStore';

const CreateWikiSection = () => {
  const router = useRouter();
  const isLogin = useStore(useAuthStore, (state) => {
    return state.isLogin;
  });
  const user = useStore(useAuthStore, (state) => {
    return state.user;
  });

  const handleButton = () => {
    if (isLogin && user?.profile?.code) {
      router.push(`/wiki/${user?.profile?.code}`);
    } else {
      router.push('/login');
    }
  };

  return (
    <section className="bg-grayscale-500">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{
          ease: 'easeInOut',
          duration: 1,
          y: { duration: 1 },
        }}
        className="flex h-[329px] flex-col items-center gap-10 px-[31px] py-[100px] md:h-[488px] md:py-[160px] lg:py-[200]"
      >
        <h1 className="text-[30px] font-bold leading-[69px] text-white md:text-[60px]">
          나만의 위키 만들어 보기
        </h1>
        <button
          type="button"
          onClick={handleButton}
          className="center transition-300 h-[54px] w-[169px] rounded-2xl bg-white px-5 py-2.5 text-xl-semibold text-grayscale-500 hover:bg-primary-green-300"
        >
          지금 시작하기
        </button>
      </motion.div>
    </section>
  );
};

export default CreateWikiSection;
