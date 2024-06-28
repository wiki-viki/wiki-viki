import React, { useState } from 'react';
import CommonButton from '@/components/common/CommonButton';
import dateToString from '@/utils/dateToString';
import QuillEditor from '@/components/AddBoard/QuillEditor';

const TITLE_MAX_LEN = 30;

const AddBoard = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [contentLength, setContentLength] = useState({ withSpaces: 0, withoutSpaces: 0 });

  const handleSubmit = () => {
    console.log('Title:', title);
    console.log('Content:', content);
  };

  const handleSearchItem = (
    content: string,
    length: { withSpaces: number; withoutSpaces: number },
  ) => {
    setContent(content);
    setContentLength(length);
  };

  return (
    <div className="center mt-4 flex-col">
      <main className="md:profile-shadow flex w-full max-w-[1060px] flex-col gap-3 rounded-10 md:gap-5 md:px-[30px] md:py-[40px]">
        <div className="flex items-center justify-between">
          <h2 className="text-lg-semibold md:text-xl-semibold lg:text-2xl-semibold">
            게시물 등록하기
          </h2>
          <CommonButton onClick={handleSubmit} variant="primary">
            등록하기
          </CommonButton>
        </div>
        <span className="text-xs-regular text-gray-400 md:text-lg-regular">
          등록일 {dateToString(new Date())}
        </span>
        <div>
          <div className="mt-1 border-t" />
          <div className="flex items-center justify-between gap-2">
            <input
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              value={title}
              className="flex-1 rounded-sm py-3 text-lg-medium outline-none md:text-xl-medium"
              placeholder="제목을 입력해주세요"
              maxLength={TITLE_MAX_LEN}
            />
            <span className="text-xs-medium md:text-md-medium">
              {title.length}/<span className="text-primary-green-200">{TITLE_MAX_LEN}</span>
            </span>
          </div>
          <div className="border-t" />
        </div>
        <span className="text-md-medium md:text-lg-medium">
          공백포함 : 총 <span className="text-primary-green-200">{contentLength.withSpaces}</span>자
          | 공백제외: 총{' '}
          <span className="text-primary-green-200">{contentLength.withoutSpaces}</span>자
        </span>
        <QuillEditor setContent={handleSearchItem} />
      </main>
      <CommonButton variant="secondary" className="my-8">
        목록으로
      </CommonButton>
    </div>
  );
};

export default AddBoard;
