import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type OrderType, ORDER_TYPE_DICT } from '@/constants/orderOption';

interface OptionProps {
  label: OrderType;
}

interface DropdownProps {
  options: OptionProps[];
  handleClickItem: (label: OrderType) => void;
}

const DropDown = ({ options, handleClickItem }: DropdownProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [labelName, setLabelName] = useState<OrderType>('recent');

  const onClickItem = (label: OrderType) => {
    setIsVisible(false);
    setLabelName(label);
    handleClickItem(label);
  };

  return (
    <div className="relative">
      <button
        onClick={() => {
          setIsVisible(!isVisible);
        }}
        className="center h-[45px] w-full justify-between rounded-md bg-grayscale-100 px-6 text-md-regular text-grayscale-400 hover:bg-grayscale-200 md:w-[110px] md:justify-around md:px-0 lg:w-[145px]"
      >
        <span>{ORDER_TYPE_DICT[labelName]}</span>
        <motion.span
          initial={{ rotate: 0 }}
          animate={{ rotate: isVisible ? -180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          ▾
        </motion.span>
      </button>

      <AnimatePresence>
        {isVisible && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 top-[120%] z-10 flex w-full flex-col items-center justify-around rounded-md border border-gray-100 bg-white text-center shadow-md md:w-[110px] lg:w-[145px]"
          >
            {options.map((option, index) => {
              return (
                <li
                  className={`w-full cursor-pointer py-[10px] text-lg-regular hover:bg-grayscale-100 ${
                    index === 0 ? 'border-b border-gray-100' : ''
                  }`}
                  key={option.label}
                  onClick={() => {
                    onClickItem(option.label);
                  }}
                >
                  {ORDER_TYPE_DICT[option.label]}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DropDown;
