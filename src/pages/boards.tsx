import React from 'react';
import BoardCard from '@/components/boards/BoardCard';
import BoardCarousel from '@/components/boards/BoardCarousel';
import testData from '../../public/data/boards.json';

const Boards = () => {
  return (
    <main className="center mx-auto max-w-[1060px] flex-col">
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
