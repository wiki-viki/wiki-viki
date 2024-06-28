import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { boardType } from '@/types/board';
import dateToString from '@/utils/dateToString';

interface BoardListProps {
  boardList: boardType[];
  className: string;
}

const BoardList = ({ boardList, className }: BoardListProps) => {
  return (
    <table className={`mt-10 w-full text-center ${className}`}>
      <thead>
        <tr className="border-y border-grayscale-200 bg-grayscale-100 text-lg-regular text-grayscale-400">
          <th className="py-3">번호</th>
          <th>제목</th>
          <th>작성자</th>
          <th>좋아요</th>
          <th>날짜</th>
        </tr>
      </thead>
      <tbody>
        {boardList.map((board) => {
          return (
            <tr
              key={board.id}
              className="border-y border-grayscale-200 text-lg-regular text-grayscale-600 hover:bg-primary-green-100"
            >
              <td className="py-3">{board.id}</td>
              <td className="max-w-[140px] px-1">
                <Link href={`/board/${board.id}`} rel="preload">
                  <motion.h3
                    whileHover={{ scale: 1.1 }}
                    className="inline-block max-w-full truncate hover:text-primary-green-200 hover:underline"
                  >
                    {board.title}
                  </motion.h3>
                </Link>
              </td>
              <td className="max-w-[35px] truncate px-1">{board.writer.name}</td>
              <td>{board.likeCount}</td>
              <td>{dateToString(board.createdAt)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default BoardList;
