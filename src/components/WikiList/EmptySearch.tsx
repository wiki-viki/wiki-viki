import Lottie from 'lottie-react';
import EmptySearchLottie from '@/../public/lottie/emptysearch.json';

interface EmptySearchProps {
  name: string;
}

const EmptySearch = ({ name }: EmptySearchProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-8 text-xl-medium text-grayscale-400 sm:text-2lg-medium">
        &quot;{name}&quot;와(과) 일치하는 검색 결과가 없습니다.
      </div>
      <Lottie animationData={EmptySearchLottie} style={{ width: '280px', height: '280px' }} />
    </div>
  );
};

export default EmptySearch;
