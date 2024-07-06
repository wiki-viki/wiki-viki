import { motion, AnimatePresence } from 'framer-motion';
import CloseIcon from '@/../public/svg/close.svg';
import { NotificationResponse } from '@/types/apiType';
import NoticeItem from './NoticeItem';

interface NoticeMenuProps {
  isOpen: boolean;
  handleClose: () => void;
  handleCount: (value: number) => void;
  totalCount: number;
  list: NotificationResponse[];
  code?: string;
  hasProfile: boolean;
  setupdateData: (value: NotificationResponse[]) => void;
}

const NoticeMenu = ({
  isOpen,
  handleClose,
  handleCount,
  totalCount,
  list,
  code,
  hasProfile,
  setupdateData,
}: NoticeMenuProps) => {
  const filteredNoticeListAndCount = (id: number) => {
    const filteredList = list.filter((notice) => {
      return id !== notice.id;
    });
    setUpdatedDataToNoticeList(filteredList);
    if (totalCount) {
      handleCount(-1);
    }
  };

  const setUpdatedDataToNoticeList = (value: NotificationResponse[]) => {
    setupdateData(value);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`fixed right-6 top-12 z-10 w-[260px] flex-col rounded-10 border border-grayscale-200 bg-[#CED8D5] px-4 py-5 shadow-md md:w-[320px] md:px-5 md:py-6 lg:right-[75px] lg:top-[58px] lg:w-[360px]`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {!hasProfile ? (
            <>
              <div className="mb-3 flex items-center justify-between md:mb-4">
                <h4 className=" text-2lg-bold md:text-xl-bold">알림창</h4>
                <CloseIcon onClick={handleClose} className="ml-auto cursor-pointer" />
              </div>
              <section className="flex max-h-[210px] flex-col gap-2 overflow-y-auto md:max-h-[230px] ">
                <p className="rounded-md bg-white p-3 py-10 text-center sm:text-md-regular">
                  알림을 받아보려면 위키를 생성하세요!
                </p>
              </section>
            </>
          ) : (
            <>
              <div className="mb-3 flex items-center justify-between md:mb-4">
                <h4 className=" text-2lg-bold md:text-xl-bold">알림 {totalCount}개</h4>
                <CloseIcon onClick={handleClose} className="cursor-pointer" />
              </div>
              {list.length > 0 ? (
                <div className="flex max-h-[210px] flex-col gap-2 overflow-y-auto md:max-h-[230px]">
                  {list.map((item) => {
                    return (
                      <NoticeItem
                        item={item}
                        key={item.id}
                        id={item.id}
                        code={code}
                        handleDelete={filteredNoticeListAndCount}
                        handleClose={handleClose}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-md bg-white p-3 py-10 text-center sm:text-md-regular">
                  <p>알림이 없습니다.</p>
                </div>
              )}
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NoticeMenu;
