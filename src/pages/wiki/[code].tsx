import React, { useState } from 'react';
import { useRouter } from 'next/router';
import UserProfile from '@/components/Profiles/UserProfile';
import CommonButton from '@/components/common/CommonButton';
import QuizModalTemplete from '@/components/Profiles/QuizModalTemplete';
import useBoolean from '@/hooks/useBoolean';
import Modal from '@/components/common/Modal';
import CopyLinkButton from '@/components/common/CopyLinkButton';
import { WIKI_BASE_URL } from '@/constants/url';
import { StyledToastContainer } from '@/styles/ToastStyle';
import 'react-toastify/dist/ReactToastify.css';
import mockData from '../../../public/profileMockData.json';

const noContentClassName = `text-lg-regular text-grayscale-400`;

const UserWikiPage: React.FC = () => {
  const router = useRouter();
  const { code } = router.query;
  const URL = `${WIKI_BASE_URL}${code}`;
  const [isEditing, setIsEditing] = useState(false);

  const { value, handleOff, handleOn } = useBoolean();

  const hadnleWikiStateButtonClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSaveClick = () => {};

  return (
    <div className="center m-auto max-w-[1350px] flex-col px-6 py-14 sm:flex-col sm:pt-10 md:px-14 xl:relative">
      <StyledToastContainer limit={1} />

      {isEditing || (
        <>
          <div className="mb-5 flex w-full items-center justify-between">
            <h1 className="text-3_5xl-bold text-grayscale-500">{mockData.name}</h1>
            {mockData.content && (
              <CommonButton variant="primary" className="xl:mr-[385px]" onClick={handleOn}>
                위키 참여하기
              </CommonButton>
            )}
          </div>
          <div className="mb-5 flex w-full justify-start">
            <CopyLinkButton url={URL} />
          </div>
        </>
      )}

      <UserProfile {...mockData} isEditing={isEditing} />

      <div
        className={`w-full xl:absolute ${mockData.content ? 'xl:top-[200px]' : 'xl:bottom-[500px]'} md:mt-5 xl:right-[440px] xl:mb-auto xl:w-[856px]`}
      >
        {mockData.content === null
          ? isEditing || (
              <div className="flex h-[184px] w-full flex-col items-center justify-center rounded-10 bg-grayscale-100 md:mt-14 md:h-[192px]">
                <p className={noContentClassName}>아직 작성된 내용이 없네요.</p>
                <p className={noContentClassName}>위키에 참여해보세요!</p>
                <CommonButton
                  variant="primary"
                  className="mt-4"
                  onClick={hadnleWikiStateButtonClick}
                >
                  시작하기
                </CommonButton>
              </div>
            )
          : isEditing
            ? ''
            : mockData.content}
      </div>

      {isEditing && (
        <div className="ml-auto mt-auto flex gap-3 sm:absolute sm:right-[45px] sm:top-[75px] md:absolute md:right-[75px] md:top-[75px] lg:right-[75px] lg:top-[95px] xl:static xl:mt-5">
          <CommonButton variant="secondary" onClick={handleCancelClick}>
            취소
          </CommonButton>
          <CommonButton variant="primary" onClick={handleSaveClick}>
            저장
          </CommonButton>
        </div>
      )}

      <Modal isOpen={value} onClose={handleOff}>
        <QuizModalTemplete onClose={handleOff} />
      </Modal>
    </div>
  );
};

export default UserWikiPage;
