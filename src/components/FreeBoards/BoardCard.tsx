import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { type boardType } from '@/types/board';
import dateToString from '@/utils/dateToString';
import EmptyImage from '../../../public/image/empty-image.png';

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
          src={board.image ? board.image : EmptyImage}
          fill
          priority
          className="absolute rounded-t-10 object-cover"
        />
      </div>
      <div className="mx-[19px] mt-[18px] flex flex-col gap-[6px]">
        <Link href={`/board/${board.id}`} rel="preload">
          <h3 className="truncate text-lg-semibold text-grayscale-500 hover:text-primary-green-200 hover:underline md:text-2lg-semibold">
            {board.title}
          </h3>
        </Link>
        <div className="flex flex-wrap justify-between text-xs-regular text-grayscale-400 md:text-sm-medium">
          <div className="flex gap-1">
            <span className="max-w-[70px] truncate md:max-w-[60px]">{board.writer.name}</span>
            <span>{dateToString(board.createdAt).substring(2)}</span>
          </div>
          <span>
            <span className="mr-[2px] text-primary-green-200">❤︎</span>
            {board.likeCount}
          </span>
        </div>
      </div>
    </motion.article>
  );
};

export default BoardCard;
