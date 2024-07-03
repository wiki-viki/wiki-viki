import React, { useState } from 'react';
import { CommentResponse } from '@/types/apiType';
import { changeComment } from '@/lib/apis/comment/commentApi.api';
import CommonButton from '../common/CommonButton';
import ToastSelect from '../common/ToastSelect';

interface CommentEditProps {
  comment: CommentResponse;
  onCommentUpdated: (updatedComment: CommentResponse) => void;
}

const CommentEdit = ({ comment, onCommentUpdated }: CommentEditProps) => {
  const MAX_CHARACTERS = 500;

  const [editedContent, setEditedContent] = useState(comment.content);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedContent(e.target.value);
  };

  const handleSaveComment = async () => {
    try {
      const updatedComment = await changeComment(comment.id, { content: editedContent });
      onCommentUpdated(updatedComment);
    } catch (error) {
      ToastSelect({ type: 'error', message: '댓글을 작성해주세요.' });
    }
  };

  return (
    <>
      <div className="my-4 min-w-[320px] rounded-md bg-grayscale-50 p-4 shadow-md">
        <h3 className="text-md-semibold text-grayscale-500 lg:text-lg-semibold">댓글 수정</h3>
        <textarea
          value={editedContent}
          onChange={handleContentChange}
          className="textareaNone h-[55%] w-full overflow-hidden bg-grayscale-50 pt-2 text-grayscale-500"
          placeholder="댓글을 수정하세요."
          maxLength={MAX_CHARACTERS}
        />
        <div className="flex justify-end">
          <CommonButton variant="primary" onClick={handleSaveComment}>
            수정
          </CommonButton>
        </div>
      </div>
    </>
  );
};

export default CommentEdit;
