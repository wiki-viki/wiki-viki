import React, { useState, useEffect } from 'react';

interface PaginationProps {
  totalCount: number;
  page: number;
  pageSize: number;
  handlePage: (value: number) => void;
}

const PAGES_PER_GROUP = 5;

const Pagination = ({ totalCount, page, handlePage, pageSize }: PaginationProps) => {
  const [pageBtnDisabled, setPageBtnDisabled] = useState({
    prevPagesBtn: true,
    nextPagesBtn: false,
  });
  const [pageGroup, setPageGroup] = useState(0);

  const totalPages = Math.ceil(totalCount / pageSize);
  const pageArr = Array.from({ length: totalPages }, (_, i) => {
    return i + 1;
  });

  const twoDimensionalPageArr = Array.from(
    { length: Math.ceil(totalPages / PAGES_PER_GROUP) }, // 2차원 배열의 길이
    (_, i) => {
      return pageArr.slice(i * PAGES_PER_GROUP, (i + 1) * PAGES_PER_GROUP);
    },
  );

  const handleClick = (value: number) => {
    handlePage(value);
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    setPageBtnDisabled((prevState) => {
      return {
        ...prevState,
        prevPagesBtn: page > twoDimensionalPageArr[0][4] ? false : true,
        nextPagesBtn:
          page < twoDimensionalPageArr[twoDimensionalPageArr.length - 1][0] ? false : true,
      };
    });
  }, [pageGroup, twoDimensionalPageArr.length]);

  const setPrevPageGroup = () => {
    setPageGroup((prevState) => {
      return prevState - 1;
    });
    handlePage(twoDimensionalPageArr[pageGroup - 1][4]);
  };

  const setNextPageGroup = () => {
    setPageGroup((prevState) => {
      return prevState + 1;
    });
    handlePage(twoDimensionalPageArr[pageGroup + 1][0]);
  };

  return (
    <div className="mx-auto my-0 flex items-center gap-2.5">
      <button
        className={`center size-11 rounded-10 bg-white  drop-shadow-md sm:size-10 ${pageBtnDisabled.prevPagesBtn ? ' text-gray-200 hover:drop-shadow-md' : `active:page-btn-active hover:drop-shadow-xl`}`}
        disabled={pageBtnDisabled.prevPagesBtn}
        onClick={setPrevPageGroup}
      >
        &lt;
      </button>
      {twoDimensionalPageArr[pageGroup].map((pageNum) => {
        return (
          <button
            className={`center active:page-btn-active size-11 rounded-10 drop-shadow-md hover:drop-shadow-xl sm:size-10 ${page === pageNum ? `page-btn-active bg-primary-green-200 text-white` : `bg-white`}`}
            key={pageNum}
            onClick={() => {
              return handleClick(pageNum);
            }}
          >
            {pageNum}
          </button>
        );
      })}
      <button
        className={`center  size-11 rounded-10 bg-white drop-shadow-md  sm:size-10 ${pageBtnDisabled.nextPagesBtn ? 'text-gray-200 hover:drop-shadow-md' : 'active:page-btn-active hover:drop-shadow-xl'}`}
        disabled={pageBtnDisabled.nextPagesBtn}
        onClick={setNextPageGroup}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
