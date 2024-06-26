import React, { KeyboardEvent, useState, useEffect } from 'react';
import Link from 'next/link';
import { BoardList, DropDown, MobileBoardList, BestBoardContainer } from '@/components/FreeBoards';
import CommonButton from '@/components/common/CommonButton';
import Pagination from '@/components/common/Pagination';
import { type OrderType } from '@/constants/orderOption';
import SearchBar from '@/components/common/SearchBar';
import { getArticle } from '@/lib/apis/article/articleApi.api';
import { ArticleListResponse } from '@/types/apiType';

// 게시물 목록 가져오기
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
    console.error(error);
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
  const [keyword, setKeyword] = useState('');

  const handlePage = (value: number) => {
    setPage(value);
  };

  const handleClickOrderType = (value: OrderType) => {
    setOrderBy(value);
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

  const fetchArticleData = async (page: number, orderBy: OrderType) => {
    const res = await getArticle({ page, orderBy });
    setBoardListData(res);
    console.log('실행됨');
  };

  useEffect(() => {
    fetchArticleData(page, orderBy);
  }, [page, orderBy]);

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
              handleClickItem={handleClickOrderType}
            />
          </div>
        </div>
        <BoardList className="hidden md:table" boardList={boardListData.list} />
        <MobileBoardList className="md:hidden" boardList={boardListData.list} />
        <div className="center my-[60px]">
          <Pagination
            totalCount={boardListData.totalCount}
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
