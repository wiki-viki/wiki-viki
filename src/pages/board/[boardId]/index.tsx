import { useRouter } from 'next/router';
import Link from 'next/link';

const BoardDetail = () => {
  const router = useRouter();
  const { boardId } = router.query;

  return (
    <div>
      {boardId}번 게시물<Link href={`/board/${boardId}/edit`}>수정하기</Link>
    </div>
  );
};

export default BoardDetail;
