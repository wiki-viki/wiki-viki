import React from 'react';
import UserProfile from '@/components/Profiles/UserProfile';
import mockData from '../../../profileMockData.json';

const UserWikiPage = () => {
  return (
    <div className="center m-auto max-w-[1200px] flex-col border border-black px-6 py-14 sm:flex-col">
      <h1 className="mb-5 mr-auto text-3_5xl-bold text-grayscale-500">{mockData.name}</h1>
      <UserProfile {...mockData} />
    </div>
  );
};

export default UserWikiPage;
