import { useRouter } from 'next/router';

const BoardDetail = () => {
  const router = useRouter();
  const { boardId } = router.query;

  return <div>{boardId}번 게시물</div>;
};

export default BoardDetail;
