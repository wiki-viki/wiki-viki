import React, { useState } from 'react';
import { Zoom } from 'react-toastify';
import CopyLinkButton from '@/components/common/CopyLinkButton';
import ToastSelect from '@/components/common/ToastSelect';
import 'react-toastify/dist/ReactToastify.css';
import { StyledToastContainer } from '@/styles/ToastStyle';
import SearchBar from '@/components/common/SearchBar';
import { ToastType } from '@/types/toast';

const url = 'https://www.youtube.com/';

const Test3 = () => {
  const [type, setType] = useState<ToastType>('check');
  const [message, setMessage] = useState('');

  const handleToastChange = (type: ToastType) => {
    setType(type);
  };

  const handleShowToast = () => {
    ToastSelect({ type, message });
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

      <div className="flex">
        <button
          className="m-5"
          onClick={() => {
            handleToastChange('notification');
          }}
        >
          Notification
        </button>
        <button
          className="m-5"
          onClick={() => {
            handleToastChange('check');
          }}
        >
          check
        </button>
        <button
          className="m-5"
          onClick={() => {
            handleToastChange('error');
          }}
        >
          Error
        </button>

        <button
          className="m-5"
          onClick={() => {
            handleToastChange('check'), setMessage('예시문구한번넣어볼게요!');
          }}
        >
          예시문구한번넣어볼게요!
        </button>

        <button
          className="m-5"
          onClick={() => {
            handleToastChange('notification'), setMessage('과연될지모르겠네요 ㅠ');
          }}
        >
          과연될지모르겠네요 ㅠ
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
