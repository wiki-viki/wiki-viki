import React, { useState } from 'react';
import { CommentResponse } from '@/types/apiType';
import { changeComment } from '@/lib/apis/comment/commentApi.api';
import CommonButton from '../common/CommonButton';

interface CommentEditProps {
  comment: CommentResponse;
  onCommentUpdated: (updatedComment: CommentResponse) => void;
}

const CommentEdit = ({ comment, onCommentUpdated }: CommentEditProps) => {
  const [editedContent, setEditedContent] = useState(comment.content);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedContent(e.target.value);
  };

  const handleSaveComment = async () => {
    try {
      const updatedComment = await changeComment(comment.id, { content: editedContent });
      onCommentUpdated(updatedComment);
    } catch (error) {
      console.error('댓글 수정 에러:', error);
    }
  };

  return (
    <div className="rounded-md bg-white p-4 shadow-md">
      <h3 className=" mb-2 font-bold">댓글 수정</h3>
      <textarea
        className="mb-4 w-full rounded-md border border-grayscale-100 p-2"
        value={editedContent}
        onChange={handleContentChange}
      />
      <div className="flex justify-end">
        <CommonButton variant="secondary" onClick={handleSaveComment}>
          저장
        </CommonButton>
      </div>
    </div>
  );
};

export default CommentEdit;
