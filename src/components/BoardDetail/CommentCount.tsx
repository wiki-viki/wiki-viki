import React, { useEffect, useState } from 'react';
import { CommentListResponse, CommentResponse } from '@/types/apiType';
import { getComment } from '@/lib/apis/comment/commentApi.api';
import { IdType } from '@/types/boardDetail';
import CommentCard from './CommentCard';

interface CommentCountProps {
  id: IdType;
  isCommentSubmitted: boolean;
  setIsCommentSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentCount = ({ id, isCommentSubmitted, setIsCommentSubmitted }: CommentCountProps) => {
  const [commentsData, setCommentsData] = useState<CommentListResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCommnetsData = async () => {
    setIsLoading(true);
    try {
      const res = await getComment(Number(id), 99);
      setCommentsData(res);
      setIsCommentSubmitted(false); // 댓글 목록 데이터 가져오기 완료 후 false로 설정
    } catch (error) {
      console.error('error', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteComment = (commentId: number) => {
    setCommentsData((prevData) => {
      if (prevData) {
        return {
          ...prevData,
          list: prevData.list.filter((comment) => {
            return comment.id !== commentId;
          }),
        };
      }
      return prevData;
    });
  };

  const handleCommentUpdated = (updatedComment: CommentResponse) => {
    setCommentsData((prevData) => {
      if (prevData) {
        return {
          ...prevData,
          list: prevData.list.map((comment) => {
            if (comment.id === updatedComment.id) {
              return updatedComment;
            }
            return comment;
          }),
        };
      }
      return prevData;
    });
  };

  useEffect(() => {
    if (id) {
      fetchCommnetsData();
    }
  }, [id, isCommentSubmitted]);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : commentsData ? (
        <>
          <div>댓글 총 개수: {commentsData.list.length}</div>
          {commentsData.list.map((comment: CommentResponse) => {
            return (
              <CommentCard
                key={comment.id}
                comment={comment}
                onDeleteComment={handleDeleteComment}
                onCommentUpdated={handleCommentUpdated}
              />
            );
          })}
        </>
      ) : (
        <div>댓글이 없습니다.</div>
      )}
    </>
  );
};

export default CommentCount;
