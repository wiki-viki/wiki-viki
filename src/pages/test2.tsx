import React, { useState } from 'react';
import { useRouter } from 'next/router';
import CommonButton from '@/components/common/CommonButton';
import Pagination from '@/components/common/Pagination';

const Test2 = () => {
  const [isActived, setIsActived] = useState(false);
  const [page, setPage] = useState(1);
  const router = useRouter();

  const handleClick = () => {
    alert('위키는 나중에~');
  };

  const handleClick2 = () => {
    router.push('/');
  };

  const handleActive = () => {
    setIsActived(!isActived);
  };

  const handlePage = (value: number) => {
    setPage(value);
  };

  return (
    <div className="flex h-lvh flex-col items-center justify-center gap-3">
      <CommonButton
        variant="primary"
        isActive={isActived}
        disabled={!isActived}
        onClick={handleClick}
      >
        내 위키 만들기
      </CommonButton>
      <CommonButton variant="primary" isActive={true} className="w-full" onClick={handleClick2}>
        홈으로 가기
      </CommonButton>
      <CommonButton variant="secondary" onClick={handleActive}>
        버튼 상태 변경하기
      </CommonButton>
      <Pagination totalCount={80} pageSize={3} page={page} handlePage={handlePage} />
    </div>
  );
};

export default Test2;
