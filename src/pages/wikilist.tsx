/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import SearchBar from '@/components/common/SearchBar';
import Pagination from '@/components/common/Pagination';
import testData from '@/../public/data/wikilist.json';
import { NoSearch, SearchLabel, UserCard } from '@/components/WikiList';

const PAGE_SIZE = 3;

const WikiListPage = () => {
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [filteredList, setFilteredList] = useState(testData.list);
  const [totalCount, setTotalCount] = useState(testData.totalCount);

  const handleSearchItem = (keyword: string) => {
    setKeyword(keyword);
    const filtered = testData.list.filter((item) => {
      return item.name.toLowerCase().includes(keyword.toLowerCase());
    });
    setFilteredList(filtered);
    setTotalCount(filtered.length);
    setPage(1);
  };

  const handlePage = (value: number) => {
    setPage(value);
  };

  useEffect(() => {
    handleSearchItem(keyword);
  }, [keyword]);

  return (
    <main className="mx-auto mt-[30px] max-w-[1060px] flex-col">
      <div className="min-w-full">
        <SearchBar placeholder="검색어 입력하세요" onSearchItem={handleSearchItem} />
      </div>
      <section>
        {filteredList.length > 0 ? (
          <>
            <SearchLabel keyword={keyword} totalCount={totalCount} />
            <UserCard cardList={filteredList.slice((page - 1) * PAGE_SIZE, PAGE_SIZE * page)} />
            <div className="center my-[60px]">
              <Pagination
                totalCount={totalCount}
                pageSize={PAGE_SIZE}
                page={page}
                handlePage={handlePage}
              />
            </div>
          </>
        ) : (
          <div className="mt-60 sm:mt-40">
            <NoSearch keyword={keyword} />
          </div>
        )}
      </section>
    </main>
  );
};

export default WikiListPage;
