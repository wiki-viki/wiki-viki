interface SearchLabelProps {
  name: string;
  totalCount: number;
}

const SearchLabel = ({ name, totalCount }: SearchLabelProps) => {
  return (
    <div className={`mt-4 text-md-regular text-grayscale-400 ${name ? '' : ' invisible'}`}>
      &quot;{name}&quot; 님을 총 <span className=" text-primary-green-200">{totalCount}명</span>{' '}
      찾았습니다.
    </div>
  );
};

export default SearchLabel;
