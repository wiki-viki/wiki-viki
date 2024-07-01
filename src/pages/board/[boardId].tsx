import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ArticleCard from '@/components/BoardDetail/ArticleCard';
import { CommentFormData } from '@/types/apiType';
import { postComment } from '@/lib/apis/comment/commentApi.api';
import { CommentForm, CommentCount } from '@/components/BoardDetail';

const BoardDetail = () => {
  const router = useRouter();
  const { boardId } = router.query;
  const [isCommentSubmitted, setIsCommentSubmitted] = useState(false);

  const handleCommentSubmit = async (formData: CommentFormData) => {
    try {
      await postComment(Number(boardId), formData);
      setIsCommentSubmitted(true); // 댓글 작성 완료 상태 변경
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <ArticleCard id={boardId} />
      <CommentForm onSubmit={handleCommentSubmit} />
      <div>
        <Link href="/boards">목록으로 돌아가기</Link>
      </div>
      <CommentCount
        id={boardId}
        isCommentSubmitted={isCommentSubmitted}
        setIsCommentSubmitted={setIsCommentSubmitted}
      />
    </>
  );
};

export default BoardDetail;
