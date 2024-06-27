import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from '../../../../public/svg/close.svg';
import testData from '../../../../public/data/notification.json';
import NoticeItem from './NoticeItem';

interface NoticeMenuProps {
  isOpen: boolean;
  handleClose: () => void;
}

const NoticeMenu = ({ isOpen, handleClose }: NoticeMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`fixed right-4 top-12 z-10 w-[260px] flex-col rounded-10 border border-grayscale-200 bg-[#CED8D5] px-4 py-5 shadow-md md:w-[320px] md:px-5 md:py-6 lg:right-[75px] lg:top-[58px] lg:w-[360px]`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="mb-3 flex items-center justify-between md:mb-4">
            <h4 className=" text-2lg-bold md:text-xl-bold">알림 {testData.totalCount}개</h4>
            <CloseIcon onClick={handleClose} className="cursor-pointer" />
          </div>
          <section className="flex max-h-[210px] flex-col gap-2 overflow-y-auto md:max-h-[230px] ">
            {testData.list.map((item) => {
              return <NoticeItem item={item} key={item.id} />;
            })}
          </section>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NoticeMenu;
