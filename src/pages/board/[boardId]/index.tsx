import { useRouter } from 'next/router';
import Link from 'next/link';
import ArticleCard from '@/components/BoardDetail/ArticleCard';
import { ArticleComments } from '@/components/BoardDetail';
import CommonButton from '@/components/common/CommonButton';
import { useAuthStore } from '@/store/userAuthStore';
import { useStore } from '@/store/useStore';
import MetaTag from '@/components/common/MetaTag';

const BoardDetail = () => {
  const router = useRouter();
  const { boardId } = router.query;

  const userId = useStore(useAuthStore, (state) => {
    return state.user?.id;
  });

  const isLogin = useStore(useAuthStore, (state) => {
    return state.isLogin;
  });

  return (
    <>
      <MetaTag title="상세 게시물" description="자유게시판 상세 게시물" url={`board/${boardId}`} />
      <main className="mx-auto mt-[30px] max-w-[1060px] flex-col ">
        <ArticleCard id={boardId} userId={userId} isLogin={isLogin} />

        <div className="centerOfScreen mt-20 min-w-[320px] flex-col">
          <Link href="/boards" rel="preload">
            <CommonButton variant="secondary" className="my-8 px-10">
              목록으로
            </CommonButton>
          </Link>
        </div>
        <ArticleComments id={boardId} userId={userId} isLogin={isLogin} />
      </main>
    </>
  );
};

export default BoardDetail;
