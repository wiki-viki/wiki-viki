import React from 'react';
import Link from 'next/link';
import BoardCard from '@/components/boards/BoardCard';
import BoardCarousel from '@/components/boards/BoardCarousel';
import CommonButton from '@/components/common/CommonButton';
import testData from '../../public/data/boards.json';

const Boards = () => {
  return (
    <main className="mx-auto max-w-[1060px] flex-col">
      <div className="mb-[63px] flex items-center justify-between">
        <h2 className="text-2xl-bold">
          <span className="text-primary-green-300">♣️</span> 베스트 게시글
        </h2>
        <Link href="/addboard">
          <CommonButton variant="primary">게시물 등록하기</CommonButton>
        </Link>
      </div>
      <section className="hidden w-full grid-cols-2 gap-4 md:grid lg:grid-cols-4">
        {testData.list.map((board) => {
          return <BoardCard key={board.id} board={board} />;
        })}
      </section>
      <section className="w-full md:hidden">
        <BoardCarousel>
          {testData.list.map((board) => {
            return <BoardCard key={board.id} board={board} />;
          })}
        </BoardCarousel>
      </section>
    </main>
  );
};

export default Boards;
