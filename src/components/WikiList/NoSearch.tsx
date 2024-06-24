/* eslint-disable react/no-unescaped-entities */
import Lottie from 'lottie-react';
import NoSearchLottie from '@/../public/lottie/nosearch.json';

interface NoSearchProps {
  keyword: string;
}

const NoSearch = ({ keyword }: NoSearchProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-8 text-xl-medium text-grayscale-400 sm:text-2lg-medium">
        "{keyword}"와 일치하는 검색 결과가 없습니다.
      </div>
      <Lottie animationData={NoSearchLottie} style={{ width: '280px', height: '280px' }} />
    </div>
  );
};

export default NoSearch;
