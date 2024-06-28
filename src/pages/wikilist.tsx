import React, { useEffect, useRef, useState } from 'react';
import { Zoom } from 'react-toastify';
import SearchBar from '@/components/common/SearchBar';
import Pagination from '@/components/common/Pagination';
import { EmptySearch, SearchLabel, UserCard } from '@/components/WikiList';
import { StyledToastContainer } from '@/styles/ToastStyle';
import 'react-toastify/dist/ReactToastify.css';
import { getProfiles } from '@/lib/apis/profile/profileApi.api';
import { ProfileListResponse } from '@/types/apiType';

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

  const fetchProfilesData = async (page: number, name: string) => {
    try {
      const res = await getProfiles({ pageSize: PAGE_SIZE, page, name });
      setProfileListData(res);
      console.log('fetchdata:', profileListData);
    } catch (error) {
      console.error('error');
    }
  };

  const handleSearchItem = async (name: string) => {
    const processedKeyword = name.replace(/\s/g, '');
    setName(processedKeyword);
    setPage(1);
  };

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    fetchProfilesData(page, name);
  }, [name, page]);

  return (
    <main className="mx-auto mt-[30px] max-w-[1060px] flex-col">
      <StyledToastContainer limit={1} transition={Zoom} />
      <div className="min-w-full">
        <SearchBar placeholder="검색어 입력하세요" onSearchItem={handleSearchItem} />
      </div>
      <section>
        {profileListData.totalCount !== 0 ? (
          <>
            <SearchLabel name={name} totalCount={profileListData.totalCount} />
            <UserCard cardList={profileListData.list} />
            <div className="center my-[60px]">
              <Pagination
                totalCount={profileListData.totalCount}
                pageSize={PAGE_SIZE}
                page={page}
                handlePage={(value) => {
                  setPage(value);
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
