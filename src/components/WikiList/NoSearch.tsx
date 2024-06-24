/* eslint-disable react/no-unescaped-entities */
import Image from 'next/image';
import NoSearchImg from '@/../public/image/nosearch-image.png';

interface NoSearchProps {
  keyword: string;
}

const NoSearch = ({ keyword }: NoSearchProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-8 text-xl-medium text-grayscale-400 sm:text-2lg-medium">
        "{keyword}"와 일치하는 검색 결과가 없습니다.
      </div>
      <Image src={NoSearchImg} alt="검색 결과 실패 이미지" width={144} height={144} />
    </div>
  );
};

export default NoSearch;
