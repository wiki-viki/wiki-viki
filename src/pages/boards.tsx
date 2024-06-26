import React, { KeyboardEvent, useState, useEffect } from 'react';
import Link from 'next/link';
import {
  BoardList,
  MobileBoardList,
  BestBoardContainer,
  BoardFilterBar,
} from '@/components/FreeBoards';
import CommonButton from '@/components/common/CommonButton';
import Pagination from '@/components/common/Pagination';
import { type OrderType } from '@/constants/orderOption';
import { getArticle } from '@/lib/apis/article/articleApi.api';
import { ArticleListResponse } from '@/types/apiType';
import { NoSearch } from '@/components/WikiList';

// 베스트 게시물, 게시물 목록 가져오기 [SSR]
export const getServerSideProps = async () => {
  try {
    const [bestBoardList, boardList] = await Promise.all([
      getArticle({ pageSize: 4, orderBy: 'like' }),
      getArticle({}),
    ]);
    return {
      props: {
        bestBoardList,
        boardList,
      },
    };
  } catch (error) {
    console.log(error);
    console.log('에러처리 어떻게 하면 좋을까요?');
    return {
      props: { error },
    };
  }
};

const PAGE_SIZE = 10;

interface BoardsProps {
  bestBoardList: ArticleListResponse;
  boardList: ArticleListResponse;
}

const Boards = ({ bestBoardList, boardList }: BoardsProps) => {
  const [boardListData, setBoardListData] = useState<ArticleListResponse>(boardList);
  const [page, setPage] = useState(1);
  const [orderBy, setOrderBy] = useState<OrderType>('recent');
  const [inputValue, setInputValue] = useState('');
  const [keyword, setKeyword] = useState('');

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
    setKeyword(inputValue.trim());
  };

  const fetchArticleData = async (page: number, orderBy: OrderType, keyword: string) => {
    try {
      const res = await getArticle({ page, orderBy, keyword });
      console.log('실행');
      setBoardListData(res);
    } catch (error) {
      console.error('에러 처리 어떻게 하면 좋을까요?');
    }
  };

  useEffect(() => {
    fetchArticleData(page, orderBy, keyword);
  }, [page, orderBy, keyword]);

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
        <BoardFilterBar
          setInputValue={setInputValue}
          handleKeyDown={handleKeyDown}
          handleSubmitKeyword={handleSubmitKeyword}
          setOrderBy={setOrderBy}
        />
        {boardListData.totalCount === 0 ? (
          <div className="mt-10">
            <NoSearch keyword={keyword} />
          </div>
        ) : (
          <>
            <BoardList className="hidden md:table" boardList={boardListData.list} />
            <MobileBoardList className="md:hidden" boardList={boardListData.list} />
          </>
        )}
        <div className="center my-[60px]">
          {boardListData.totalCount > PAGE_SIZE && (
            <Pagination
              totalCount={boardListData.totalCount}
              pageSize={PAGE_SIZE}
              page={page}
              handlePage={(value) => {
                setPage(value);
              }}
            />
          )}
        </div>
      </section>
    </main>
  );
};

export default Boards;
