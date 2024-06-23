import React from 'react';
import BoardCard from '@/components/boards/BoardCard';
import testData from '../../public/data/boards.json';

const Boards = () => {
  return (
    <main className="center mx-auto max-w-[1060px]">
      <section className="grid w-full grid-cols-2 gap-4 lg:grid-cols-4">
        {testData.list.map((board) => {
          return <BoardCard key={board.id} board={board} />;
        })}
      </section>
    </main>
  );
};

export default Boards;
