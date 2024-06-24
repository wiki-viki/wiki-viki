import React, { useEffect, useState } from 'react';
import SearchBar from '@/components/common/SearchBar';
import Pagination from '@/components/common/Pagination';
import testData from '@/../public/data/wikilist.json';
import UserCard from '@/components/WikiList/UserCard';

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
            <div
              className={`mt-4 text-md-regular text-grayscale-400 ${keyword ? '' : 'invisible'}`}
            >
              "{keyword}" 님을 총 <span className=" text-primary-green-200">{totalCount}명</span>{' '}
              찾았습니다.
            </div>
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
          <div className="my-[60px] text-center">검색 결과가 없습니다.</div>
        )}
      </section>
    </main>
  );
};

export default WikiListPage;
