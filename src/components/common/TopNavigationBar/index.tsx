import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import useBoolean from '@/hooks/useBoolean';
import { useAuthStore } from '@/store/userAuthStore';
import Logo from '@/../public/svg/wiki-viki-logo.svg';
import NotifyIcon from '@/../public/svg/notification.svg';
import ProfileIcon from '@/../public/svg/profile.svg';
import HamburgerIcon from '@/../public/svg/hamburger.svg';
import useIsMobile from '@/hooks/useIsMobile';
import { useStore } from '@/store/useStore';
import { NotificationResponse } from '@/types/apiType';
import { getNotification } from '@/lib/apis/notification/notificationApi.api';
import ToastSelect from '../ToastSelect';
import UserMenu from './UserMenu';
import AuthUserMenu from './AuthUserMenu';
import NoticeMenu from './NoticeMenu';

const linkClassNames = 'px-2 hover:rounded-md hover:bg-grayscale-100';
const activeLinkClassNames = 'font-bold text-primary-green-300';
const PAGE = 1;
const PAGE_SIZE = 20;

const TopNavigationBar = () => {
  const { pathname } = useRouter();
  const { checkLogin } = useAuthStore();
  const [noticeList, setNoticeList] = useState<NotificationResponse[]>([]);
  const [noticeTotalCount, setNoticeTotalCount] = useState<number>(0);

  const isLogin = useStore(useAuthStore, (state) => {
    return state.isLogin;
  });
  const user = useStore(useAuthStore, (state) => {
    return state.user;
  });
  const userProfile = useStore(useAuthStore, (state) => {
    return state.userProfile;
  });

  const hasProfile = !!(user?.profile?.code || userProfile?.code);
  const isMobile = useIsMobile();

  const menuRef = useRef<HTMLDivElement | null>(null);
  const { value: isMenuOpen, handleOff: menuClose, handleToggle: menuToggle } = useBoolean();

  const noticeRef = useRef<HTMLDivElement | null>(null);
  const { value: isNoticeOpen, handleOff: noticeClose, handleToggle: noticeToggle } = useBoolean();

  const handleCount = (value: number) => {
    setNoticeTotalCount((prev) => {
      return prev + value;
    });
  };

  const getNoticeList = async (page: number, pageSize: number) => {
    try {
      const res = await getNotification({ page, pageSize });
      if (res.list !== noticeList && res.totalCount !== noticeTotalCount) {
        setNoticeList(res.list);
        setNoticeTotalCount(res.totalCount);
      }
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

  const setUpdatedDataToNoticeList = (value: NotificationResponse[]) => {
    setNoticeList(value);
  };

  useEffect(() => {
    checkLogin();
  }, [checkLogin]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        menuClose();
      }
      if (noticeRef.current && !noticeRef.current.contains(e.target as Node)) {
        noticeClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuClose, noticeClose]);

  useEffect(() => {
    if (userProfile?.code || user?.profile.code) {
      getNoticeList(PAGE, PAGE_SIZE);

      const intervalId = setInterval(() => {
        getNoticeList(PAGE, PAGE_SIZE);
      }, 5000);

      return () => {
        return clearInterval(intervalId);
      };
    }
  }, [user?.profile?.code, userProfile?.code]);

  return (
    <header className="sticky top-0 z-20 flex h-[60px] w-full items-center justify-between border-b-grayscale-300 bg-white px-5 shadow-md lg:h-[80px] lg:px-[80px]">
      <div className="flex items-center gap-5">
        <Link href="/" rel="preload" aria-label="Link to Landing Page">
          <Logo width={107} height={30} />
        </Link>
        {isMobile || (
          <nav>
            <ul className="flex gap-5 text-md-regular text-grayscale-500">
              <li className={linkClassNames}>
                <Link
                  href="/wikilist"
                  className={`${pathname === '/wikilist' ? activeLinkClassNames : ''}`}
                  rel="preload"
                >
                  위키목록
                </Link>
              </li>
              <li className={linkClassNames}>
                <Link
                  href="/boards"
                  className={`${pathname === '/boards' ? activeLinkClassNames : ''}`}
                  rel="preload"
                >
                  자유게시판
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
      <div>
        {isLogin ? (
          <div className="flex gap-6">
            <div ref={noticeRef}>
              {noticeTotalCount > 0 && (
                <span
                  className="center absolute size-4 cursor-pointer rounded-full bg-red-500 text-[9px] text-white md:right-[78px] lg:right-[138px]"
                  onClick={noticeToggle}
                >
                  {noticeTotalCount}
                </span>
              )}
              <NotifyIcon
                onClick={noticeToggle}
                width={24}
                height={24}
                className="cursor-pointer"
              />
              <NoticeMenu
                handleClose={noticeClose}
                isOpen={isNoticeOpen}
                handleCount={handleCount}
                totalCount={noticeTotalCount}
                list={noticeList}
                hasProfile={hasProfile}
                code={user?.profile?.code}
                setupdateData={setUpdatedDataToNoticeList}
              />
            </div>
            <div ref={menuRef} className="relative size-[24px]">
              {userProfile?.image ? (
                <Image
                  src={userProfile?.image}
                  onClick={menuToggle}
                  fill
                  priority
                  objectFit="cover"
                  className="cursor-pointer rounded-full border-primary-green-200"
                  alt="개인 프로필 이미지"
                />
              ) : (
                <ProfileIcon onClick={menuToggle} className="cursor-pointer" />
              )}
              <AuthUserMenu isMobile={isMobile} isOpen={isMenuOpen} handleClose={menuClose} />
            </div>
          </div>
        ) : (
          <>
            {isMobile ? (
              <div ref={menuRef} className="cursor-pointer">
                <HamburgerIcon onClick={menuToggle} />
                <UserMenu isOpen={isMenuOpen} handleClose={menuClose} />
              </div>
            ) : (
              <Link
                rel="preload"
                href="/login"
                className={`${linkClassNames} py-1 text-md-regular text-grayscale-400`}
              >
                로그인
              </Link>
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default TopNavigationBar;
