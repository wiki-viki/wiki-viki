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

        <div className="centerOfScreen mt-10 min-w-[320px] flex-col">
          <Link href="/boards" className="">
            <CommonButton variant="secondary" className="px-[38px]">
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
