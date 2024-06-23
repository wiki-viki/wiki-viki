import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { type boardType } from '@/types/board';
import dateToString from '@/utils/dateToString';

interface BoardCardProps {
  board: boardType;
}

const BoardCard = ({ board }: BoardCardProps) => {
  return (
    <article className="relative h-[220px] w-full rounded-10 shadow-lg">
      <div className="relative h-3/5 w-full">
        <Image
          alt="게시물 이미지"
          src={board.image ? board.image : '/image/empty-image.png'}
          layout="fill"
          objectFit="cover"
          className="rounded-t-10"
        />
      </div>
      <Link href={`/board`}>
        <div className="mx-[19px] mt-[18px] flex flex-col gap-[6px]">
          <h3 className="text-2lg-semibold text-grayscale-500">{board.title}</h3>
          <div className="flex justify-between text-md-regular text-grayscale-400">
            <div className="flex gap-[10px]">
              <span>{board.writer.name}</span>
              <span>{dateToString(board.createdAt)}</span>
            </div>
            <span>{board.likeCount}</span>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default BoardCard;
