import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CommentResponse } from '@/types/apiType';
import dateToString from '@/utils/dateToString';
import { deleteComment } from '@/lib/apis/comment/commentApi.api';
import BasicProfileImage from '@/../public/images/basic_profile.png';
import DeleteIcon from '@/../public/svg/delete.svg';
import EditIcon from '@/../public/svg/edit.svg';
import ToastSelect from '@/components/common/ToastSelect';
import CommentEditModal from './CommentEdit';

interface CommentItemProps {
  id: number;
  comment: CommentResponse;
  onDeleteComment: (commentId: number) => void;
  onCommentUpdated: (updatedComment: CommentResponse) => void;
}

const CommentCard = ({ id, comment, onDeleteComment, onCommentUpdated }: CommentItemProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleDeleteComment = async () => {
    try {
      await deleteComment(comment.id);
      onDeleteComment(comment.id);
      ToastSelect({ type: 'check', message: '댓글이 삭제되었습니다.' });
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const handleEditComment = () => {
    setIsEditModalOpen(true);
    setIsEditing(true);
  };

  const handleCommentUpdated = (updatedComment: CommentResponse) => {
    setIsEditModalOpen(false);
    setIsEditing(false);
    onCommentUpdated(updatedComment);
  };

  return (
    <>
      <div className={`mt-7 ${isEditing ? 'hidden' : ''}`}>
        <div className=" relative min-w-[320px] gap-2.5 rounded-10 px-5 py-4 shadow-md">
          <div className="flex ">
            <div className="relative size-10 shrink-0 rounded-full md:size-[50px]">
              <Image
                src={comment.writer.image || BasicProfileImage}
                alt="프로필 이미지"
                layout="fill"
              />
            </div>
            <div className="  ml-[15px] flex-col break-words text-grayscale-500 lg:max-w-none">
              <div className="text-lg-semibold lg:text-2lg-semibold ">{comment.writer.name}</div>
              <div className="flex-wrap break-words text-md-regular lg:text-lg-regular">
                {comment.content}
              </div>
              <div className="text-md-regular text-grayscale-400 lg:text-lg-regular">
                {dateToString(comment.createdAt)}
              </div>
            </div>
          </div>
          <div className=" absolute right-5 top-4 flex justify-end gap-2">
            {id === comment.writer.id && (
              <>
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                  onClick={handleEditComment}
                >
                  <EditIcon />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                  onClick={handleDeleteComment}
                >
                  <DeleteIcon />
                </motion.div>
              </>
            )}
          </div>
        </div>
      </div>

      {isEditModalOpen && (
        <CommentEditModal comment={comment} onCommentUpdated={handleCommentUpdated} />
      )}
    </>
  );
};

export default CommentCard;
