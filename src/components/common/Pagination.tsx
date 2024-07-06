import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface PaginationProps {
  totalCount: number;
  page: number;
  pageSize: number;
  handlePage: (value: number) => void;
}

const PAGES_PER_GROUP = 5;

const Pagination = ({ totalCount, page, handlePage, pageSize }: PaginationProps) => {
  const [pageListBtnDisabled, setPageListBtnDisabled] = useState({
    prevPageListBtn: true,
    nextPageListBtn: false,
  });
  const [pageBtnDisabled, setPageBtnDisabled] = useState({
    prevPageBtn: true,
    nextPageBtn: false,
  });
  const [pageGroup, setPageGroup] = useState(0);

  const totalPages = Math.ceil(totalCount / pageSize);
  const pageButtonList = Array.from({ length: totalPages }, (_, i) => {
    return i + 1;
  });

  const pageButtonLists = Array.from(
    { length: Math.ceil(totalPages / PAGES_PER_GROUP) }, // 2차원 배열의 길이
    (_, i) => {
      return pageButtonList.slice(i * PAGES_PER_GROUP, (i + 1) * PAGES_PER_GROUP);
    },
  );

  const handleClick = (value: number) => {
    handlePage(value);
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    setPageListBtnDisabled((prevState) => {
      return {
        ...prevState,
        prevPageListBtn: page > pageButtonLists[0][4] ? false : true,
        nextPageListBtn: page < pageButtonLists[pageButtonLists.length - 1][0] ? false : true,
      };
    });
  }, [pageGroup, pageButtonLists.length]);

  useEffect(() => {
    setPageBtnDisabled((prev) => {
      return {
        ...prev,
        prevPageBtn: page > 1 ? false : true,
        nextPageBtn: page === totalPages ? true : false,
      };
    });
  }, [page]);

  const setPrevPageGroup = () => {
    setPageGroup((prevState) => {
      return prevState - 1;
    });
    handlePage(pageButtonLists[pageGroup - 1][4]);
  };

  const setNextPageGroup = () => {
    setPageGroup((prevState) => {
      return prevState + 1;
    });
    handlePage(pageButtonLists[pageGroup + 1][0]);
  };

  const setPrevPage = () => {
    if (page > 1) {
      handlePage(page - 1);
    }
    if (page > 1 && page % 5 === 1) {
      setPageGroup((prevState) => {
        return prevState - 1;
      });
      handlePage(page - 1);
    }
  };

  const setNextPage = () => {
    if (page < totalPages) {
      handlePage(page + 1);
    }
    if (page > 1 && page % 5 === 0) {
      setPageGroup((prevState) => {
        return prevState + 1;
      });
      handlePage(page + 1);
    }
  };

  return (
    <div className="mx-auto my-0 flex items-center gap-2.5">
      <button
        className={`center size-11 rounded-10 bg-white  drop-shadow-md sm:size-9 ${pageListBtnDisabled.prevPageListBtn ? ' text-gray-200 hover:drop-shadow-md' : `active:page-btn-active hover:drop-shadow-xl`}`}
        disabled={pageListBtnDisabled.prevPageListBtn}
        onClick={setPrevPageGroup}
      >
        &lt;&lt;
      </button>
      <button
        className={`center size-11 rounded-10 bg-white  drop-shadow-md sm:size-9 ${pageBtnDisabled.prevPageBtn ? ' text-gray-200 hover:drop-shadow-md' : `active:page-btn-active hover:drop-shadow-xl`}`}
        disabled={pageBtnDisabled.prevPageBtn}
        onClick={setPrevPage}
      >
        &lt;
      </button>
      {pageButtonLists[pageGroup].map((pageNum) => {
        return (
          <motion.button
            initial={{ scale: 1 }}
            whileTap={{ scale: 0.8 }}
            className={`center active:page-btn-active size-11 rounded-10 drop-shadow-md hover:drop-shadow-xl sm:size-9 ${page === pageNum ? `page-btn-active bg-primary-green-200 text-white` : `bg-white`}`}
            key={pageNum}
            onClick={() => {
              handleClick(pageNum);
            }}
          >
            {pageNum}
          </motion.button>
        );
      })}
      <button
        className={`center  size-11 rounded-10 bg-white drop-shadow-md  sm:size-9 ${pageBtnDisabled.nextPageBtn ? 'text-gray-200 hover:drop-shadow-md' : 'active:page-btn-active hover:drop-shadow-xl'}`}
        disabled={pageBtnDisabled.nextPageBtn}
        onClick={setNextPage}
      >
        &gt;
      </button>
      <button
        className={`center  size-11 rounded-10 bg-white drop-shadow-md  sm:size-9 ${pageListBtnDisabled.nextPageListBtn ? 'text-gray-200 hover:drop-shadow-md' : 'active:page-btn-active hover:drop-shadow-xl'}`}
        disabled={pageListBtnDisabled.nextPageListBtn}
        onClick={setNextPageGroup}
      >
        &gt;&gt;
      </button>
    </div>
  );
};

export default Pagination;
