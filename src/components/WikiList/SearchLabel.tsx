interface NoSearchProps {
  keyword: string;
  totalCount: number;
}

const SearchLabel = ({ keyword, totalCount }: NoSearchProps) => {
  return (
    <div className={`mt-4 text-md-regular text-grayscale-400 ${keyword ? '' : 'invisible'}`}>
      &quot;{keyword}&quot; 님을 총 <span className=" text-primary-green-200">{totalCount}명</span>{' '}
      찾았습니다.
    </div>
  );
};

export default SearchLabel;
