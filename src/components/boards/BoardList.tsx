import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { boardType } from '@/types/board';
import dateToString from '@/utils/dateToString';

interface BoardListProps {
  boardList: boardType[];
}

const BoardList = ({ boardList }: BoardListProps) => {
  return (
    <table className="mt-10 w-full text-center">
      <thead>
        <tr className="border-y border-grayscale-200 text-lg-regular text-grayscale-400">
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
              className="border-y border-grayscale-200 text-lg-regular text-grayscale-600"
            >
              <td className="py-3">{board.id}</td>
              <td>
                <Link href={`/board/${board.id}`}>
                  <motion.p
                    whileHover={{ scale: 1.1 }}
                    className="hover:text-primary-green-200 hover:underline"
                  >
                    {board.title}
                  </motion.p>
                </Link>
              </td>
              <td>{board.writer.name}</td>
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
