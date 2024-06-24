import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { type boardType } from '@/types/board';
import dateToString from '@/utils/dateToString';

interface BoardCardProps {
  board: boardType;
}

const BoardCard = ({ board }: BoardCardProps) => {
  return (
    <motion.article
      className="relative h-[220px] w-full rounded-10 shadow-lg"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative h-3/5 w-full">
        <Image
          alt="게시물 이미지"
          src={board.image ? board.image : '/image/empty-image.png'}
          fill
          priority
          className="rounded-t-10 object-cover"
        />
      </div>
      <Link href={`/board`}>
        <div className="mx-[19px] mt-[18px] flex flex-col gap-[6px]">
          <h3 className="truncate text-lg-semibold text-grayscale-500 md:text-2lg-semibold">
            {board.title}
          </h3>
          <div className="flex justify-between text-xs-regular text-grayscale-400 md:text-md-regular">
            <div className="flex gap-[10px]">
              <span className="max-w-[70px] truncate md:max-w-[50px]">{board.writer.name}</span>
              <span>{dateToString(board.createdAt)}</span>
            </div>
            <span>
              <span className="mr-1 text-primary-green-200">❤︎</span>
              {board.likeCount}
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
};

export default BoardCard;
