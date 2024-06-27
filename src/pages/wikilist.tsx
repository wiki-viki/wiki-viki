import React, { useEffect, useRef, useState } from 'react';
import { Zoom } from 'react-toastify';
import SearchBar from '@/components/common/SearchBar';
import Pagination from '@/components/common/Pagination';
import { EmptySearch, SearchLabel, UserCard } from '@/components/WikiList';
import { searchRegex } from '@/utils/searchRegex';
import { StyledToastContainer } from '@/styles/ToastStyle';
import 'react-toastify/dist/ReactToastify.css';
import { getProfiles } from '@/lib/apis/profile/profileApi.api';
import { ProfileResponse } from '@/types/apiType';

const PAGE_SIZE = 3;

export const getServerSideProps = async () => {
  try {
    const { list, totalCount } = await getProfiles({ pageSize: PAGE_SIZE });
    return {
      props: {
        profileList: {
          list,
          totalCount,
        },
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
  profileList: {
    list: ProfileResponse[];
    totalCount: number;
  };
}

const WikiListPage = ({ profileList }: WikiListProps) => {
  const isInitialRender = useRef(true);
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');
  const [profileListData, setProfileListData] = useState<ProfileResponse[]>(profileList.list);
  const [profileListCount, setProfileListCount] = useState(profileList.totalCount);

  const fetchProfilesData = async (page: number) => {
    try {
      const res = await getProfiles({ pageSize: PAGE_SIZE, page, name });
      setProfileListData(res.list);
      setProfileListCount(res.totalCount);
    } catch (error) {
      console.error('error');
    }
  };

  const handleSearchItem = async (name: string) => {
    const processedKeyword = name.replace(/\s/g, '');
    setName(processedKeyword);
    const filtered = profileListData.filter((item) => {
      return searchRegex(name, item.name);
    });
    setProfileListData(filtered);
    setProfileListCount(filtered.length);
    setPage(1);
  };

  const handlePage = (value: number) => {
    setPage(value);
  };

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    fetchProfilesData(page);
  }, [page, name]);

  return (
    <main className="mx-auto mt-[30px] max-w-[1060px] flex-col">
      <StyledToastContainer limit={1} transition={Zoom} />
      <div className="min-w-full">
        <SearchBar placeholder="검색어 입력하세요" onSearchItem={handleSearchItem} />
      </div>
      <section>
        {profileListCount !== 0 ? (
          <>
            <SearchLabel name={name} totalCount={profileListCount} />
            <UserCard cardList={profileListData.slice((page - 1) * PAGE_SIZE, PAGE_SIZE * page)} />
            <div className="center my-[60px]">
              <Pagination
                totalCount={profileListCount}
                pageSize={PAGE_SIZE}
                page={page}
                handlePage={handlePage}
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
