import React, { KeyboardEvent } from 'react';
import { OrderType } from '@/constants/orderOption';
import SearchBar from '../common/SearchBar';
import CommonButton from '../common/CommonButton';
import DropDown from './DropDown';

interface BoardFilterBarProps {
  setInputValue: (value: string) => void;
  handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  handleSubmitKeyword: () => void;
  setOrderBy: (value: OrderType) => void;
}

const BoardFilterBar = ({
  setInputValue,
  handleKeyDown,
  handleSubmitKeyword,
  setOrderBy,
}: BoardFilterBarProps) => {
  return (
    <div className="mt-[40px] flex w-full flex-col justify-between gap-4 md:mt-[60px] md:flex-row lg:gap-[20px]">
      <div className="flex w-full justify-between gap-4 lg:gap-[20px]">
        <div className="flex-1">
          <SearchBar
            placeholder="제목을 검색해주세요"
            onSearchItem={(value) => {
              setInputValue(value);
            }}
            isDebounce={false}
            onKeyDown={(e) => {
              handleKeyDown(e);
            }}
          />
        </div>
        <CommonButton variant="primary" onClick={handleSubmitKeyword}>
          검색
        </CommonButton>
      </div>
      <div>
        <DropDown
          options={[{ label: 'recent' }, { label: 'like' }]}
          handleClickItem={(value) => {
            setOrderBy(value);
          }}
        />
      </div>
    </div>
  );
};

export default BoardFilterBar;
