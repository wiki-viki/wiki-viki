import React, { useState } from 'react';
import CopyLinkButton from '@/components/common/CopyLinkButton';
import ToastSelect from '@/components/common/ToastSelect';
import 'react-toastify/dist/ReactToastify.css';
import { StyledToastContainer } from '@/styles/ToastStyle';
import SearchBar from '@/components/common/SearchBar';
import { Zoom } from 'react-toastify';

const url = 'https://www.youtube.com/';

const Test3 = () => {
  const [type, setType] = useState('check');

  const handleTypeChange = (e: string) => {
    setType(e);
  };

  const handleShowToast = () => {
    ToastSelect({ type });
  };

  const [keyword, setKeyword] = useState('');

  const handleSearchItem = (keyword: string) => {
    setKeyword(keyword);
  };

  return (
    <>
      <div className=" m-5">
        <CopyLinkButton url={url} />
      </div>
      <div className=" m-5">
        <CopyLinkButton url="https://www.youtube." />
      </div>
      <div className=" m-5">
        <CopyLinkButton url="adsfasdfasfd" />
      </div>

      <div> 현재 type : {type}</div>

      <div className=" m-5">
        <button
          onClick={() => {
            handleTypeChange('notification');
          }}
        >
          Notification
        </button>
        <button
          onClick={() => {
            handleTypeChange('check');
          }}
        >
          check
        </button>
        <button
          onClick={() => {
            handleTypeChange('error');
          }}
        >
          Error
        </button>

        <button onClick={handleShowToast}>Click me</button>
        <StyledToastContainer limit={1} transition={Zoom} />
      </div>

      <div className="w-[300px]">
        <SearchBar placeholder="검색어 입력하세요" onSearchItem={handleSearchItem} />
        <p>검색한 내용 {keyword}</p>
      </div>
      <div className="w-[400px]">
        <SearchBar placeholder="검색어 입력하세요" onSearchItem={handleSearchItem} />
        <p>검색한 내용 {keyword}</p>
      </div>
      <div className="w-screen">
        <SearchBar placeholder="검색어 입력하세요" onSearchItem={handleSearchItem} />
        <p>검색한 내용 {keyword}</p>
      </div>
    </>
  );
};

export default Test3;
