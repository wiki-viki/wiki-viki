import React, { useEffect, useRef, useState } from 'react';
import { Zoom } from 'react-toastify';
import SearchBar from '@/components/common/SearchBar';
import Pagination from '@/components/common/Pagination';
import { EmptySearch, SearchLabel, UserCard } from '@/components/WikiList';
import { StyledToastContainer } from '@/styles/ToastStyle';
import 'react-toastify/dist/ReactToastify.css';
import { getProfiles } from '@/lib/apis/profile/profileApi.api';
import { ProfileListResponse } from '@/types/apiType';
import ToastSelect from '@/components/common/ToastSelect';
import { ToastProps } from '@/types/toast';

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
    console.error('Error fetching profiles:', error);
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
  const [isLoading, setIsLoading] = useState(false);

  const fetchProfilesData = async (page: number, name: string) => {
    setIsLoading(true);
    try {
      const res = await getProfiles({ pageSize: PAGE_SIZE, page, name });
      setProfileListData(res);
      console.log('fetchdata:', profileListData, name);
    } catch (error) {
      console.error('error');
    } finally {
      setIsLoading(false);
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
  }, [page, name]);

  return (
    <main className="mx-auto mt-[30px] max-w-[1060px] flex-col">
      <StyledToastContainer limit={1} transition={Zoom} />
      <div className="min-w-full">
        <SearchBar placeholder="검색어 입력하세요" onSearchItem={handleSearchItem} />
      </div>
      <section>
        {profileListData.totalCount !== 0 ? (
          <>
            {!isLoading && <SearchLabel name={name} totalCount={profileListData.totalCount} />}
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
  );
};

export default WikiListPage;
