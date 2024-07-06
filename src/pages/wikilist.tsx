import React, { useEffect, useRef, useState } from 'react';
import { Zoom } from 'react-toastify';
import router from 'next/router';
import SearchBar from '@/components/common/SearchBar';
import Pagination from '@/components/common/Pagination';
import { EmptySearch, SearchLabel, UserCard } from '@/components/WikiList';
import { StyledToastContainer } from '@/styles/ToastStyle';
import 'react-toastify/dist/ReactToastify.css';
import { getProfiles } from '@/lib/apis/profile/profileApi.api';
import { ProfileListResponse } from '@/types/apiType';
import MetaTag from '@/components/common/MetaTag';

import ToastSelect from '@/components/common/ToastSelect';
import { ToastProps } from '@/types/toast';
import OpenGraphTag from '@/components/common/MetaTag/OpenGraphTag';

const PAGE_SIZE = 3;

export const getServerSideProps = async () => {
  try {
    const profileList = await getProfiles({ pageSize: PAGE_SIZE });
    return {
      props: {
        profileList,
      },
    };
  } catch (error) {
    router.push('/500');
    return {
      props: { error },
    };
  }
};

interface WikiListProps {
  profileList: ProfileListResponse;
}

const WikiListPage = ({ profileList }: WikiListProps) => {
  const isInitialRender = useRef(true);
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');
  const [profileListData, setProfileListData] = useState<ProfileListResponse>(profileList);
  const [showSearchLabel, setShowSearchLabel] = useState(false);

  const fetchProfilesData = async (page: number, name: string) => {
    try {
      const res = await getProfiles({ pageSize: PAGE_SIZE, page, name });
      setProfileListData(res);
      setShowSearchLabel(res.totalCount > 0);
    } catch (error) {
      router.push('/500');
    }
  };

  const handleSearchItem = async (name: string) => {
    setName(name.replace(/\s/g, ''));
    setPage(1);

    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    if (specialCharRegex.test(name)) {
      ToastSelect({
        type: 'error',
        message: '검색어에 특수문자는 사용할 수 없습니다.',
      } as ToastProps);
      setName('');
      return;
    }

    await fetchProfilesData(1, name);
  };

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    fetchProfilesData(page, name);
    setShowSearchLabel(false);
  }, [page, name]);

  return (
    <>
      <MetaTag title="위키목록" description="유저들의 위키목록 페이지" />
      <OpenGraphTag title="위키목록" description="위키목록 페이지" />
      <main className="mx-auto mt-[30px] max-w-[1060px] flex-col">
        <StyledToastContainer limit={1} transition={Zoom} />
        <div className="min-w-full">
          <SearchBar placeholder="검색어 입력하세요" onSearchItem={handleSearchItem} />
        </div>
        <section>
          {showSearchLabel ? (
            <SearchLabel name={name} totalCount={profileListData.totalCount} />
          ) : (
            <div className="h-10"></div>
          )}
          {profileListData.totalCount > 0 ? (
            <>
              <UserCard cardList={profileListData.list} />
              <div className="center my-[60px]">
                <Pagination
                  totalCount={profileListData.totalCount}
                  pageSize={PAGE_SIZE}
                  page={page}
                  handlePage={(value) => {
                    setPage(value);
                    fetchProfilesData(value, name);
                  }}
                />
              </div>
            </>
          ) : (
            <div className="mt-60 sm:mt-40">
              <EmptySearch name={name} />
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default WikiListPage;
