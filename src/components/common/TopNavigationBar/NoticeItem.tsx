import React from 'react';
import { NotificationResponse } from '@/types/apiType';
import { timeDiff } from '@/utils/timeDiff';
import DeleteIcon from '../../../../public/svg/close.svg';

interface NoticeItemProps {
  item: NotificationResponse;
}

const NoticeItem = ({ item }: NoticeItemProps) => {
  const handleClickDelete = () => {
    // [TODO]
    // 알림 삭제 기능 구현
  };

  return (
    <div className="flex flex-col rounded-md border px-2 py-1">
      <div className="flex items-center justify-between">
        <div>·</div>
        <DeleteIcon onClick={handleClickDelete} className="cursor-pointer" />
      </div>
      <span>{item.content}</span>
      <span>{timeDiff(item.createdAt)}</span>
    </div>
  );
};

export default NoticeItem;
