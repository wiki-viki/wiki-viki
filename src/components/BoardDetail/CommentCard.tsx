import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { CommentResponse } from '@/types/apiType';
import dateToString from '@/utils/dateToString';
import { deleteComment } from '@/lib/apis/comment/commentApi.api';
import { getMyInfo } from '@/lib/apis/user/userApi.api';
import BasicProfileImage from '@/../public/images/basic_profile.png';
import CommonButton from '../common/CommonButton';
import CommentEditModal from './CommentEdit';

interface CommentItemProps {
  comment: CommentResponse;
  onDeleteComment: (commentId: number) => void;
  onCommentUpdated: (updatedComment: CommentResponse) => void;
}

const CommentCard = ({ comment, onDeleteComment, onCommentUpdated }: CommentItemProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<number>();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getMyInfo();
        setCurrentUserId(userInfo.id);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
    fetchUserInfo();
  }, []);

  const handleDeleteComment = async () => {
    try {
      await deleteComment(comment.id);
      onDeleteComment(comment.id);
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
      <div className={`border-b border-grayscale-100 py-4 ${isEditing ? 'hidden' : ''}`}>
        <div className="flex items-center justify-between">
          <div className="relative size-[85px] rounded-full">
            <Image
              src={comment.writer.image || BasicProfileImage}
              alt="프로필 이미지"
              layout="fill"
            />
          </div>
          <div>{comment.writer.name}</div>
          <div className="flex gap-2">
            {currentUserId === comment.writer.id && (
              <>
                <CommonButton variant="secondary" onClick={handleEditComment}>
                  수정
                </CommonButton>
                <CommonButton variant="secondary" onClick={handleDeleteComment}>
                  삭제
                </CommonButton>
              </>
            )}
          </div>
        </div>
        <div>{comment.content}</div>
        <div>{dateToString(comment.createdAt)}</div>
      </div>
      {isEditModalOpen && (
        <CommentEditModal comment={comment} onCommentUpdated={handleCommentUpdated} />
      )}
    </>
  );
};

export default CommentCard;
