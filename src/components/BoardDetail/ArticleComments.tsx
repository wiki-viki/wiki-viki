import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Lottie from 'lottie-react';
import router from 'next/router';
import { CommentResponse, CommentFormData } from '@/types/apiType';
import { getComment, postComment } from '@/lib/apis/comment/commentApi.api';
import { IdType } from '@/types/boardDetail';
import { getMyInfo } from '@/lib/apis/user/userApi.api';
import EmptyCommentLottie from '@/../public/lottie/emptycomment.json';
import ToastSelect from '../common/ToastSelect';
import { CommentCard, CommentCount, CommentForm } from './index';

interface ArticleCommentsProps {
  id: IdType;
}

const LIMIT = 10;

const ArticleComments = ({ id }: ArticleCommentsProps) => {
  const [commentsData, setCommentsData] = useState<CommentResponse[]>([]);
  const [nextCursor, setNextCursor] = useState<number | null>();
  const [userId, setUserId] = useState(0);
  const [commentCount, setCommentCount] = useState<number>();

  const { ref, inView } = useInView();

  const fetchUserInfo = async () => {
    try {
      const userInfo = await getMyInfo();
      setUserId(userInfo.id);
    } catch (error) {
      router.push('/500');
    }
  };

  const fetchComments = async () => {
    try {
      const res = await getComment(Number(id), LIMIT, nextCursor);
      setCommentsData((prevData) => {
        return [...prevData, ...res.list];
      });
      setNextCursor(res.nextCursor);
    } catch (error) {
      router.push('/500');
    }
  };

  const getCommentsCount = async () => {
    try {
      const res = await getComment(Number(id), 9999);
      setCommentCount(res.list.length);
      console.log(res.list.length);
    } catch (error) {
      router.push('/500');
    }
  };

  const handleDeleteComment = (commentId: number) => {
    setCommentsData((prevData) => {
      return prevData.filter((comment) => {
        return comment.id !== commentId;
      });
    });
  };

  const handleCommentUpdated = (updatedComment: CommentResponse) => {
    setCommentsData((prevData) => {
      return prevData.map((comment) => {
        return comment.id === updatedComment.id ? updatedComment : comment;
      });
    });
  };

  const handleCommentSubmit = async (formData: CommentFormData) => {
    try {
      const newComment = await postComment(Number(id), formData);
      setCommentsData((prevData) => {
        return [newComment, ...prevData];
      });
    } catch (e) {
      ToastSelect({ type: 'error', message: '댓글을 작성해주세요.' });
    }
  };

  useEffect(() => {
    getCommentsCount();
  }, [handleDeleteComment, handleCommentSubmit]);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (inView && nextCursor !== null) {
      fetchComments();
    }
  }, [inView]);

  return (
    <>
      <CommentCount count={commentCount} />
      <CommentForm onSubmit={handleCommentSubmit} />
      {commentCount === 0 ? (
        <div className="centerOfScreen mt-20 min-w-[320px] flex-col text-grayscale-400">
          <Lottie animationData={EmptyCommentLottie} style={{ width: '220px', height: '220px' }} />
          댓글이 없습니다.
        </div>
      ) : (
        commentsData.map((comment: CommentResponse) => {
          return (
            <CommentCard
              key={comment.id}
              id={userId}
              comment={comment}
              onDeleteComment={handleDeleteComment}
              onCommentUpdated={handleCommentUpdated}
            />
          );
        })
      )}
      <div ref={ref} className="h-10" />
    </>
  );
};
export default ArticleComments;
