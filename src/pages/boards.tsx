import React, { KeyboardEvent, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
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
import { EmptySearch } from '@/components/WikiList';

const PAGE_SIZE = 10;

// 베스트 게시물, 게시물 목록 가져오기 [SSR]
export const getServerSideProps = async () => {
  try {
    const [bestBoardList, boardList] = await Promise.all([
      getArticle({ pageSize: 4, orderBy: 'like' }),
      getArticle({ pageSize: PAGE_SIZE }),
    ]);
    return {
      props: {
        bestBoardList,
        boardList,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/500',
        permanent: false,
      },
    };
  }
};

interface BoardsProps {
  bestBoardList: ArticleListResponse;
  boardList: ArticleListResponse;
}

const Boards = ({ bestBoardList, boardList }: BoardsProps) => {
  const router = useRouter();
  const isInitialRender = useRef(true);
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
    setPage(1);
  };

  const fetchArticleData = async (page: number, orderBy: OrderType, keyword: string) => {
    try {
      const res = await getArticle({ pageSize: PAGE_SIZE, page, orderBy, keyword });
      setBoardListData(res);
    } catch (error) {
      router.push('/500');
    }
  };

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    fetchArticleData(page, orderBy, keyword);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <>
          {boardListData.totalCount === 0 ? (
            <div className="my-10">
              <EmptySearch name={keyword} />
            </div>
          ) : (
            <>
              <BoardList className="hidden md:table" boardList={boardListData.list} />
              <MobileBoardList className="md:hidden" boardList={boardListData.list} />
              <div className="center my-[60px]">
                <Pagination
                  totalCount={boardListData.totalCount}
                  pageSize={PAGE_SIZE}
                  page={page}
                  handlePage={(value) => {
                    setPage(value);
                  }}
                />
              </div>
            </>
          )}
        </>
      </section>
    </main>
  );
};

export default Boards;
