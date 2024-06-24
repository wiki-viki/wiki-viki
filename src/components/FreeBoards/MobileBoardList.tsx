import React from 'react';
import Link from 'next/link';
import { boardType } from '@/types/board';
import dateToString from '@/utils/dateToString';

interface MobileBoardListProps {
  boardList: boardType[];
  className: string;
}

const MobileBoardList = ({ boardList, className }: MobileBoardListProps) => {
  return (
    <div className={`mt-7 ${className}`}>
      {boardList.map((board) => {
        return (
          <article key={board.id} className="border-b px-2 py-4 hover:bg-primary-green-100">
            <Link href={`/board/${board.id}`} rel="preload">
              <h3 className="truncate text-lg-regular text-grayscale-600 hover:text-primary-green-200 hover:underline">
                {board.title}
              </h3>
            </Link>
            <div className="mt-1 flex justify-between text-lg-regular text-grayscale-400">
              <div className="flex gap-3">
                <span className="max-w-[100px] truncate">{board.writer.name}</span>
                <span>{dateToString(board.createdAt)}</span>
              </div>
              <span>
                <span className="text-primary-green-200">❤︎</span> {board.likeCount}
              </span>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default MobileBoardList;
