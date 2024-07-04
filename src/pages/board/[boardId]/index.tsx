import { useRouter } from 'next/router';
import Link from 'next/link';
import ArticleCard from '@/components/BoardDetail/ArticleCard';
import { ArticleComments } from '@/components/BoardDetail';
import CommonButton from '@/components/common/CommonButton';

const BoardDetail = () => {
  const router = useRouter();
  const { boardId } = router.query;

  return (
    <>
      <main className="mx-auto mt-[30px] max-w-[1060px] flex-col ">
        <ArticleCard id={boardId} />

        <div className="centerOfScreen mt-20 min-w-[320px] flex-col">
          <Link href="/boards" rel="preload">
            <CommonButton variant="secondary" className="my-8 px-10">
              목록으로
            </CommonButton>
          </Link>
        </div>
        <ArticleComments id={boardId} />
      </main>
    </>
  );
};

export default BoardDetail;
