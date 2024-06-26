import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { AxiosError } from 'axios';
import UserProfile from '@/components/Profiles/UserProfile';
import CommonButton from '@/components/common/CommonButton';
import QuizModalTemplete from '@/components/Profiles/QuizModalTemplete';
import useBoolean from '@/hooks/useBoolean';
import Modal from '@/components/common/Modal';
import { WIKI_BASE_URL } from '@/constants/url';
import { StyledToastContainer } from '@/styles/ToastStyle';
import 'react-toastify/dist/ReactToastify.css';
import { Editor, EditorMarkdown } from '@/components/Profiles/Editor';
import { EDITOR_TEXT } from '@/constants/editorBasicText';
import BasicWikiSection from '@/components/Profiles/BasicWikiSection';
import {
  DetailProfileResponse,
  CodeType,
  ChangeProfilesFormData,
  UserResponse,
} from '@/types/apiType';
import { getDetailProfiles, changeProfile } from '@/lib/apis/profile/profileApi.api';
import getImageUrl, { ImageData } from '@/lib/apis/image/imageApi.api';
import { getMyInfo } from '@/lib/apis/user/userApi.api';
import { FORM_DATA_INIT } from '@/constants/formDataInitialValue';
import Loading from '@/components/Loading';

const noContentClassName = `text-lg-regular text-grayscale-400`;

const UserWikiPage: React.FC = () => {
  const router = useRouter();
  const { code } = router.query;
  const URL = `${WIKI_BASE_URL}${code}`;
  const [isEditing, setIsEditing] = useState(false);

  const { value, handleOff, handleOn } = useBoolean();
  const [userProfile, setUserProfile] = useState<DetailProfileResponse | undefined>(undefined);
  const [userInfo, setUserInfo] = useState<UserResponse | undefined>(undefined);

  const isMyPage = code === (userInfo && userInfo?.profile.code);
  const editMyPage = isEditing && isMyPage;

  const [formData, setFormData] = useState<ChangeProfilesFormData>(FORM_DATA_INIT);

  const [md, setMD] = useState<string | undefined>(undefined);

  const contentClassName = `
  w-full xl:absolute
  md:mt-5 xl:right-[440px] xl:w-[856px]
  ${userProfile && userProfile.content ? 'xl:top-[150px]' : 'xl:bottom-[420px]'}
  ${isEditing ? 'xl:top-[1px]' : ''}
  ${userProfile && userProfile.content && isEditing ? 'xl:top-[40px]' : ''}
`.trim();

  const handleChange = (id: string, value?: string | File | null) => {
    setFormData((prev) => {
      return {
        ...prev,
        [id]: value,
      };
    });
  };

  const getUserProfileAndInfo = async (query: CodeType) => {
    try {
      const [profileResult, userInfoResult] = await Promise.all([
        getDetailProfiles(query),
        getMyInfo(),
      ]);

      if (profileResult || userInfoResult) {
        setUserProfile(profileResult);
        setUserInfo(userInfoResult);
        setEditorInitialValue(profileResult.content);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status === 404) {
          router.push('/404');
        } else {
          router.push('/500');
        }
      }
    }
  };

  const setEditorInitialValue = (value: string | null) => {
    setMD(value ? value : EDITOR_TEXT);
  };

  const handleWikiButtonClick = () => {
    handleOn();
  };

  const handleEditorChange = (value: string | undefined) => {
    setMD(value);
    handleChange('content', value);
  };

  const setEditingMode = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    resetState();
  };

  const resetState = () => {
    setFormData(FORM_DATA_INIT);
  };

  const handleSaveClick = async () => {
    try {
      const data = new FormData();

      // 이미지 처리 함수
      const processImage = async () => {
        if (formData.image) {
          const imageData = new FormData();
          imageData.append('image', formData.image);
          const res = await getImageUrl(imageData as ImageData);
          return res?.url || '';
        }
        return 'null'; // 이미지가 없을 경우 'null' 문자열 전송
      };

      // 변경된 필드와 데이터 처리
      Object.keys(formData).forEach((key) => {
        const currentValue = formData[key as keyof ChangeProfilesFormData];
        const previousValue = FORM_DATA_INIT[key as keyof ChangeProfilesFormData];

        if (currentValue !== previousValue && key !== 'image') {
          data.append(key, currentValue as string);
        }
      });

      // 이미지 처리 후 URL 추가
      const imageUrl = await processImage();
      data.append('image', imageUrl);

      // 프로필 변경 요청
      const res = await changeProfile(userProfile?.code, data as unknown as ChangeProfilesFormData);
      setUserProfile(res);
      setIsEditing(false);
      resetState();
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (code) {
      getUserProfileAndInfo(code);
    }
  }, [code]);

  if (!userProfile) {
    return <Loading />;
  }

  return (
    <div className="center m-auto max-w-[1350px] flex-col px-6 py-5 sm:flex-col sm:pt-10 md:px-14 xl:relative xl:py-5">
      <StyledToastContainer limit={1} />
      {isEditing || (
        <BasicWikiSection
          name={userProfile.name}
          content={userProfile.content}
          onClick={handleOn}
          url={URL}
        />
      )}

      <UserProfile
        {...userProfile}
        isEditing={isEditing}
        isMyPage={isMyPage}
        editMyPage={editMyPage}
        onChange={handleChange}
        value={formData.image}
      />

      <div className={contentClassName}>
        {!userProfile.content && !isEditing && (
          <div className="flex h-[184px] w-full flex-col items-center justify-center rounded-10 bg-grayscale-100 md:mt-5 md:h-[192px] ">
            <p className={noContentClassName}>아직 작성된 내용이 없네요.</p>
            <p className={noContentClassName}>위키에 참여해보세요!</p>
            <CommonButton variant="primary" className="mt-4" onClick={handleWikiButtonClick}>
              시작하기
            </CommonButton>
          </div>
        )}
        {isEditing ? (
          <Editor preview="live" value={md} onChange={handleEditorChange} height={740} />
        ) : (
          <EditorMarkdown source={userProfile.content} />
        )}
      </div>

      {isEditing && (
        <div className="ml-auto flex gap-3 sm:absolute sm:right-[45px] sm:top-[75px] md:absolute md:right-[75px] md:top-[75px] lg:right-[75px] lg:top-[95px] xl:static xl:mt-[30px]">
          <CommonButton variant="secondary" onClick={handleCancelClick}>
            취소
          </CommonButton>
          <CommonButton variant="primary" onClick={handleSaveClick}>
            저장
          </CommonButton>
        </div>
      )}

      <Modal isOpen={value} onClose={handleOff}>
        <QuizModalTemplete
          question={userProfile.securityQuestion}
          onClose={handleOff}
          setEditingMode={setEditingMode}
          code={userProfile.code}
        />
      </Modal>
    </div>
  );
};

export default UserWikiPage;
