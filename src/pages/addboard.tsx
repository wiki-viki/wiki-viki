import React, { useState } from 'react';
import CommonButton from '@/components/common/CommonButton';
import dateToString from '@/utils/dateToString';

const TITLE_MAX_LEN = 30;

const AddBoard = () => {
  const [title, setTitle] = useState('');

  return (
    <div className="center mt-4 flex-col">
      <main className="flex w-full flex-col gap-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg-semibold">게시물 등록하기</h2>
          <CommonButton variant="primary">등록하기</CommonButton>
        </div>
        <span className="text-xs-regular text-gray-400">작성일 {dateToString(new Date())}</span>
        <div>
          <div className="mt-1 border-t" />
          <div className="flex items-center justify-between gap-2">
            <input
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              value={title}
              className="flex-1 rounded-sm py-3 text-lg-medium outline-none"
              placeholder="제목을 입력해주세요"
              maxLength={TITLE_MAX_LEN}
            />
            <span className="text-xs-medium">
              {title.length}/<span className="text-primary-green-200">{TITLE_MAX_LEN}</span>
            </span>
          </div>
          <div className="border-t" />
        </div>
        <span className="text-md-medium">공백포함 : 총 0자 | 공백제외: 총 0자</span>
      </main>
      <CommonButton variant="secondary">목록으로</CommonButton>
    </div>
  );
};

export default AddBoard;
