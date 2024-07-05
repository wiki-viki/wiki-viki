import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from 'zustand';
import CloseIcon from '@/../public/svg/close.svg';
import { useAuthStore } from '@/store/userAuthStore';
import { getNotification } from '@/lib/apis/notification/notificationApi.api';
import { NotificationResponse } from '@/types/apiType';
import ToastSelect from '../ToastSelect';
import NoticeItem from './NoticeItem';

interface NoticeMenuProps {
  isOpen: boolean;
  handleClose: () => void;
  code: string | undefined;
  handleCount: (value: number) => void;
}

const PAGE = 1;
const PAGE_SIZE = 20;

const NoticeMenu = ({ isOpen, handleClose, code, handleCount }: NoticeMenuProps) => {
  const [noticeList, setNoticeList] = useState<NotificationResponse[]>([]);
  const [noticeTotalCount, setNoticeTotalCount] = useState<number>(0);
  const user = useStore(useAuthStore, (state) => {
    return state.user;
  });
  const userProfile = useStore(useAuthStore, (state) => {
    return state.userProfile;
  });

  const hasProfile = user?.profile || userProfile?.code;

  const getNoticeList = async (page: number, pageSize: number) => {
    try {
      const res = await getNotification({ page, pageSize });
      setNoticeList(res.list);
      setNoticeTotalCount(res.totalCount);
    } catch (e) {
      ToastSelect({
        type: 'error',
        message: '에러가 발생하여 페이지를 새로고침합니다.',
        onClose: () => {
          window.location.reload();
        },
      });
    }
  };

  const filteredNoticeListAndCount = (id: number) => {
    const filteredList = noticeList.filter((notice) => {
      return id !== notice.id;
    });
    setUpdatedDataToNoticeList(filteredList);
    if (noticeTotalCount) {
      setNoticeTotalCount((prev) => {
        if (prev === 1) {
          return 0;
        } else {
          return prev - 1;
        }
      });
    }
  };

  useEffect(() => {
    handleCount(noticeTotalCount);
  }, [handleCount, noticeTotalCount]);

  const setUpdatedDataToNoticeList = (value: NotificationResponse[]) => {
    setNoticeList(value);
  };

  useEffect(() => {
    if (code) {
      getNoticeList(PAGE, PAGE_SIZE);

      const intervalId = setInterval(() => {
        getNoticeList(PAGE, PAGE_SIZE);
      }, 60000);

      return () => {
        return clearInterval(intervalId);
      };
    }
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={`fixed right-4 top-12 z-10 w-[260px] flex-col rounded-10 border border-grayscale-200 bg-[#CED8D5] px-4 py-5 shadow-md md:w-[320px] md:px-5 md:py-6 lg:right-[75px] lg:top-[58px] lg:w-[360px]`}
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
                <h4 className=" text-2lg-bold md:text-xl-bold">알림 {noticeTotalCount}개</h4>
                <CloseIcon onClick={handleClose} className="cursor-pointer" />
              </div>
              {noticeList.length > 0 ? (
                <div className="flex max-h-[210px] flex-col gap-2 overflow-y-auto md:max-h-[230px]">
                  {noticeList.map((item) => {
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
