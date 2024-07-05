import React, { useState, memo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { UserProfileProps } from '@/types/UserProfileProps';
import useIsMobile from '@/hooks/useIsMobile';
import ExpandIcon from '../../../public/svg/profile_expand_icon.svg';
import ProfileInfos from './ProfileInfos';
import EditProfile from './UserProfile/EditProfile';

const UserProfile: React.FC<UserProfileProps> = ({
  image,
  city,
  mbti,
  job,
  sns,
  birthday,
  nickname,
  bloodType,
  nationality,
  isEditing,
  isMyPage,
  editMyPage,
  onChange,
  value,
}) => {
  const profileFields = [
    { label: '거주 도시', value: city, id: 'city' },
    { label: 'MBTI', value: mbti, id: 'mbti' },
    { label: '직업', value: job, id: 'job' },
    { label: 'SNS 계정', value: sns, id: 'sns' },
    { label: '생일', value: birthday, id: 'birthday' },
    { label: '별명', value: nickname, id: 'nickname' },
    { label: '혈액형', value: bloodType, id: 'bloodType' },
    { label: '국적', value: nationality, id: 'nationality' },
  ];
  const [isExpanded, setIsExpanded] = useState(false);

  const sectionClassName = `profile-shadow ${editMyPage ? 'sm:mt-4 sm:h-[580px] md:h-[580px] lg:h-[354px] xl:flex-col xl:justify-between' : ''} w-full flex-col justify-start rounded-10 bg-white p-5 sm:mb-8 xl:relative xl:ml-auto xl:flex xl:h-[671px] xl:w-[320px] xl:p-10 ${isEditing ? 'md:mt-[35px]' : 'bottom-[130px]'}`;

  const handleProfileExpand = () => {
    setIsExpanded((prev) => {
      return !prev;
    });
  };

  const profileHeight = isExpanded ? `h-fit` : `h-[70px] md:h-[85px] xl:h-fit`;
  const mobileSize = useIsMobile();

  return (
    <AnimatePresence>
      <section className={sectionClassName}>
        <div className={`flex w-full ${editMyPage ? 'flex-col gap-5' : ''} relative xl:flex-col`}>
          {isEditing && isMyPage ? (
            // 위키 수정 컴포넌트
            <EditProfile value={value} onChange={onChange} isMyPage={isMyPage} />
          ) : (
            <div className="relative mr-4 size-[71px] rounded-full  border-grayscale-200 md:mr-10 md:size-[81px] xl:mx-auto xl:mb-10 xl:size-[200px]">
              <Image
                src={image ? image : '/images/basic_profile.png'}
                sizes="(max-width: 768px) 62px, (max-width: 1200px) 81px, 200px"
                fill
                priority
                className="ml-3 mt-1 rounded-full object-cover sm:ml-0 xl:ml-0 xl:mt-0"
                alt="위키 페이지 개인 프로필 이미지"
              />
            </div>
          )}

          <motion.div
            className="xl:mb-[210px]"
            animate={{
              height: isExpanded ? (mobileSize ? `280px` : `290px`) : mobileSize ? `85px` : '100px',
            }}
            transition={{ duration: 0.15 }}
          >
            <div
              className={`mb-5 ${editMyPage ? 'flex flex-col gap-y-7 text-center lg:grid lg:grid-cols-2 lg:items-center xl:flex xl:flex-col xl:gap-[18px]' : 'flex flex-col gap-2'} overflow-hidden xl:gap-4 xl:py-2 ${editMyPage ? 'h-fit py-3' : profileHeight} `}
            >
              {profileFields.map((field) => {
                return (
                  <ProfileInfos
                    editMyPage={editMyPage}
                    key={field.label}
                    onChange={onChange}
                    {...field}
                  />
                );
              })}
            </div>
          </motion.div>
        </div>

        {editMyPage || (
          <motion.div
            className="flex cursor-pointer justify-center xl:hidden"
            onClick={handleProfileExpand}
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ExpandIcon />
          </motion.div>
        )}
      </section>
    </AnimatePresence>
  );
};

export default memo(UserProfile);
