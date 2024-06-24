/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, ChangeEvent } from 'react';
import debounce from '@/utils/debounce';
import SearchIcon from '../../../public/svg/search.svg';

interface SearchBarProps {
  placeholder: string;
  onSearchItem: (keyword: string) => void;
}

const SearchBar = ({ placeholder, onSearchItem }: SearchBarProps) => {
  const debounceOnSearchItem = useCallback(
    debounce((keyword: string) => {
      onSearchItem(keyword);
    }, 300),
    [onSearchItem],
  );

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    debounceOnSearchItem(e.target.value);
  };

  return (
    <div className="relative">
      <SearchIcon className="absolute left-5 top-3" />
      <input
        className="h-[45px] w-full rounded-xl bg-grayscale-100 py-3.5 pl-14  pr-5 text-md-regular text-grayscale-500 outline-none placeholder:text-md-regular placeholder:text-grayscale-400 focus:ring-2 focus:ring-primary-green-200"
        placeholder={placeholder}
        onChange={handleChangeInput}
      />
    </div>
  );
};

export default SearchBar;
