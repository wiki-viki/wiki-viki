import React from 'react';
import UserProfile from '@/components/Profiles/UserProfile';
import CommonButton from '@/components/common/CommonButton';
import mockData from '../../../profileMockData.json';

const noContentClassName = `text-lg-regular text-grayscale-400`;

const UserWikiPage = () => {
  return (
    <div className="center m-auto max-w-[1350px] flex-col px-6 py-14 sm:flex-col md:px-14 xl:relative">
      <h1 className="mb-10 mr-auto text-3_5xl-bold text-grayscale-500">{mockData.name}</h1>

      <UserProfile {...mockData} />

      <div className="w-full xl:absolute xl:bottom-[440px] xl:right-[440px] xl:mb-auto xl:w-[856px]">
        {mockData.content === null ? (
          <div className="mt-10 flex h-[184px] w-full flex-col items-center justify-center rounded-10 bg-grayscale-100 md:mt-14 md:h-[192px]">
            <p className={noContentClassName}>아직 작성된 내용이 없네요.</p>
            <p className={noContentClassName}>위키에 참여해보세요!</p>
            <CommonButton variant="primary" className="mt-4">
              시작하기
            </CommonButton>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default UserWikiPage;
