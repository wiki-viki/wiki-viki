import React, { useState } from 'react';
import SearchBar from '@/components/common/SearchBar';

const Test3 = () => {
  const [keyword, setKeyword] = useState('');

  const handleSearchItem = (keyword: string) => {
    setKeyword(keyword);
  };

  return (
    <div>
      <div className="w-[300px]">
        <SearchBar placeholder="검색어 입력하세요" onSearchItem={handleSearchItem} />
        <p>검색한 내용 {keyword}</p>
      </div>
      <div className="w-[400px]">
        <SearchBar placeholder="검색어 입력하세요" onSearchItem={handleSearchItem} />
        <p>검색한 내용 {keyword}</p>
      </div>
    </div>
  );
};

export default Test3;
