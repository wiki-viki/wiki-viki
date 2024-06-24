import React, { useState } from 'react';
import Link from 'next/link';
import BoardCard from '@/components/boards/BoardCard';
import BoardCarousel from '@/components/boards/BoardCarousel';
import CommonButton from '@/components/common/CommonButton';
import BoardList from '@/components/boards/BoardList';
import Pagination from '@/components/common/Pagination';
import DropDown from '@/components/boards/DropDown';
import { type OrderType } from '@/constants/orderOption';
import testData from '../../public/data/boards.json';

const PAGE_SIZE = 10;

const Boards = () => {
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState<OrderType>('recent');

  const handlePage = (value: number) => {
    setPage(value);
  };

  const handleClickItem = (value: OrderType) => {
    console.log(order);
    setOrder(value);
  };

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
        {testData.list.slice(0, 4).map((board) => {
          return <BoardCard key={board.id} board={board} />;
        })}
      </section>
      <section className="w-full md:hidden">
        <BoardCarousel>
          {testData.list.slice(0, 4).map((board) => {
            return <BoardCard key={board.id} board={board} />;
          })}
        </BoardCarousel>
      </section>
      <section>
        <div className="mt-5 flex">
          <Link href="/addboard">
            <CommonButton variant="primary">게시물 등록</CommonButton>
          </Link>
          <DropDown
            options={[{ label: 'recent' }, { label: 'like' }]}
            handleClickItem={handleClickItem}
          />
        </div>
        <BoardList boardList={testData.list.slice((page - 1) * PAGE_SIZE, PAGE_SIZE * page)} />
        <div className="center my-[60px]">
          <Pagination
            totalCount={testData.totalCount}
            pageSize={PAGE_SIZE}
            page={page}
            handlePage={handlePage}
          />
        </div>
      </section>
    </main>
  );
};

export default Boards;
