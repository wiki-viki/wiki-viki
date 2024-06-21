import React, { useState } from 'react';
import { useRouter } from 'next/router';
import CommonButton from '@/components/common/CommonButton';

const Test2 = () => {
  const [isActived, setIsActived] = useState(false);
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

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <CommonButton variant="primary" isActive={isActived} onClick={handleClick}>
        내 위키 만들기
      </CommonButton>
      <CommonButton variant="primary" isActive={true} className="w-full" onClick={handleClick2}>
        홈으로 가기
      </CommonButton>
      <CommonButton variant="secondary" onClick={handleActive}>
        버튼 상태 변경하기
      </CommonButton>
    </div>
  );
};

export default Test2;
