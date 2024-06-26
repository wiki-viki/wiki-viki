import React, { forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from '../../../../public/svg/close.svg';
import testData from '../../../../public/data/notification.json';
import NoticeItem from './NoticeItem';

interface NoticeMenuProps {
  isOpen: boolean;
  handleClose: () => void;
}

const NoticeMenu = forwardRef<HTMLDivElement, NoticeMenuProps>(({ isOpen, handleClose }, ref) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={ref}
          className={`fixed right-4 top-12 z-10 w-[250px] flex-col rounded-10 border border-grayscale-200 bg-white px-5 py-4 shadow-md md:w-[280px] lg:right-[75px] lg:top-[58px] lg:w-[310px]`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="mb-2 flex items-center justify-between">
            <h4>알림 {testData.totalCount}개</h4>
            <CloseIcon onClick={handleClose} className="cursor-pointer" />
          </div>
          <section className="flex max-h-[200px] flex-col gap-2 overflow-y-auto ">
            {testData.list.map((item) => {
              return <NoticeItem item={item} key={item.id} />;
            })}
          </section>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

NoticeMenu.displayName = 'NoticeMenu';

export default NoticeMenu;
