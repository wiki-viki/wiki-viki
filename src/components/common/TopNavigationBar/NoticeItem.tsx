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
    <div className="flex flex-col rounded-md border bg-white px-2 py-3 md:px-3 md:py-4">
      <div className="flex items-center justify-between">
        <div className="text-red-600">•</div>
        <DeleteIcon onClick={handleClickDelete} className="cursor-pointer" />
      </div>
      <span className="text-sm-semibold md:text-md-semibold">{item.content}</span>
      <span className="text-xs-regular text-grayscale-300">{timeDiff(item.createdAt)}</span>
    </div>
  );
};

export default NoticeItem;
