import React, { KeyboardEvent, useState } from 'react';
import Link from 'next/link';
import { BoardList, DropDown, MobileBoardList, BestBoardContainer } from '@/components/FreeBoards';
import CommonButton from '@/components/common/CommonButton';
import Pagination from '@/components/common/Pagination';
import { type OrderType } from '@/constants/orderOption';
import SearchBar from '@/components/common/SearchBar';
import { getArticle } from '@/lib/apis/article/articleApi.api';
import { ArticleListResponse } from '@/types/apiType';
import testData from '../../public/data/boards.json';

// 베스트 게시글 가져오기 ISR
export const getStaticProps = async () => {
  const res = await getArticle({ pageSize: 4, orderBy: 'like' });
  const bestBoardList = res;

  return {
    props: {
      bestBoardList,
    },
    revalidate: 60,
  };
};

const PAGE_SIZE = 10;

interface BoardsProps {
  bestBoardList: ArticleListResponse;
}

const Boards = ({ bestBoardList }: BoardsProps) => {
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState<OrderType>('recent');
  const [keyword, setKeyword] = useState('');

  const handlePage = (value: number) => {
    setPage(value);
  };

  const handleClickItem = (value: OrderType) => {
    console.log(order);
    setOrder(value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) {
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmitKeyword();
    }
  };

  const handleSubmitKeyword = () => {
    console.log(keyword);
  };

  return (
    <main className="mx-auto mt-[30px] max-w-[1060px] flex-col">
      <div className="mb-[43px] flex items-center justify-between md:mb-[63px]">
        <h2 className="text-2xl-bold">베스트 게시글</h2>
        <Link href="/addboard" rel="preload">
          <CommonButton variant="primary">게시물 등록하기</CommonButton>
        </Link>
      </div>
      <BestBoardContainer boardList={bestBoardList} />
      <section>
        <div className="mt-[40px] flex w-full flex-col justify-between gap-4 md:mt-[60px] md:flex-row lg:gap-[20px]">
          <div className="flex w-full justify-between gap-4 lg:gap-[20px]">
            <div className="flex-1">
              <SearchBar
                placeholder="제목을 검색해주세요"
                onSearchItem={(value) => {
                  setKeyword(value);
                }}
                isDebounce={false}
                onKeyDown={(e) => {
                  handleKeyDown(e);
                }}
              />
            </div>
            <CommonButton variant="primary" onClick={handleSubmitKeyword}>
              검색
            </CommonButton>
          </div>
          <div>
            <DropDown
              options={[{ label: 'recent' }, { label: 'like' }]}
              handleClickItem={handleClickItem}
            />
          </div>
        </div>
        <BoardList
          className="hidden md:table"
          boardList={testData.list.slice((page - 1) * PAGE_SIZE, PAGE_SIZE * page)}
        />
        <MobileBoardList
          className="md:hidden"
          boardList={testData.list.slice((page - 1) * PAGE_SIZE, PAGE_SIZE * page)}
        />
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
