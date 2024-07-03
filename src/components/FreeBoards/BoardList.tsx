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
          <th className="w-1/12 py-3">번호</th>
          <th className="w-1/3">제목</th>
          <th className="w-1/6">작성자</th>
          <th className="w-1/12 min-w-[40px]">좋아요</th>
          <th className="w-1/6">작성일</th>
        </tr>
      </thead>
      <tbody>
        {boardList.map((board) => {
          return (
            <tr
              key={board.id}
              className="border-y border-grayscale-200 text-lg-regular text-grayscale-600 hover:bg-primary-green-100"
            >
              <td className="w-1/12 py-3">{board.id}</td>
              <td className="w-1/3 max-w-[140px] px-1">
                <Link href={`/board/${board.id}`} rel="preload">
                  <motion.h3
                    whileHover={{ scale: 1.1 }}
                    className="mt-2 inline-block max-w-full truncate hover:text-primary-green-200 hover:underline"
                  >
                    {board.title}
                  </motion.h3>
                </Link>
              </td>
              <td className="w-1/6 max-w-[50px] px-1">
                <span className="block truncate">{board.writer.name}</span>
              </td>
              <td className="w-1/12">{board.likeCount}</td>
              <td className="w-1/6 min-w-[100px]">{dateToString(board.createdAt)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default BoardList;
