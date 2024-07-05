import React from 'react';
import Link from 'next/link';
import { NotificationResponse } from '@/types/apiType';
import { timeDiff } from '@/utils/timeDiff';
import DeleteIcon from '@/../public/svg/close.svg';
import { deleteNotification } from '@/lib/apis/notification/notificationApi.api';
import ToastSelect from '../ToastSelect';

interface NoticeItemProps {
  item: NotificationResponse;
  id: number;
  handleDelete: (value: number) => void;
  code: string | undefined;
  handleClose: () => void;
}

const NoticeItem = ({ item, id, handleDelete, code, handleClose }: NoticeItemProps) => {
  const deleteNotice = async (id: number) => {
    try {
      const res = await deleteNotification(id);
      if (res) {
        handleDelete(id);
      }
    } catch (error) {
      ToastSelect({
        type: 'error',
        message: '에러가 발생하여 페이지를 새로고침합니다.',
        onClose: () => {
          window.location.reload();
        },
      });
    }
  };

  const handleClickDeleteIcon = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    deleteNotice(id);
  };

  const handleClickNotice = () => {
    deleteNotice(id);
    handleClose();
  };

  return (
    <Link
      href={`/wiki/${code}`}
      className="flex cursor-pointer flex-col rounded-md border bg-white px-2 py-3 md:px-3 md:py-4"
      onClick={handleClickNotice}
    >
      <div className="flex items-center justify-between">
        <div className="text-red-600">•</div>
        <DeleteIcon onClick={handleClickDeleteIcon} className="cursor-pointer" />
      </div>
      <span className="text-sm-semibold md:text-md-semibold">{item.content}</span>
      <span className="text-xs-regular text-grayscale-300">{timeDiff(item.createdAt)}</span>
    </Link>
  );
};

export default NoticeItem;
