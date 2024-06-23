import React, { useState } from 'react';
import Image from 'next/image';
import ProfileInfos from './ProfileInfos';

interface UserProfileProps {
  nationality: string;
  bloodType: string;
  nickname: string;
  birthday: string;
  sns: string;
  job: string;
  mbti: string;
  city: string;
  image: string;
}

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
}) => {
  const profileFields = [
    { label: '거주 도시', value: city },
    { label: 'MBTI', value: mbti },
    { label: '직업', value: job },
    { label: 'SNS 계정', value: sns },
    { label: '생일', value: birthday },
    { label: '별명', value: nickname },
    { label: '혈액형', value: bloodType },
    { label: '국적', value: nationality },
  ];
  const [isExpanded, setIsExpanded] = useState(false);

  const handleProfileExtend = () => {
    setIsExpanded((prev) => {
      return !prev;
    });
  };

  const profileHeight = isExpanded ? `h-fit` : `h-[70px] md:h-[85px] xl:h-fit`;

  return (
    <section
      className={`profile-shadow xl:center flex w-full flex-col justify-start rounded-10 bg-white p-5 xl:sticky xl:top-[30px] xl:ml-auto xl:h-[671px] xl:w-[320px] xl:p-10`}
    >
      <div className="flex w-full xl:flex-col">
        <div className="relative mr-4 size-[62px] rounded-full border border-grayscale-200 md:mr-10 md:size-[81px] xl:mx-auto xl:mb-12 xl:size-[200px]">
          <Image
            src={image}
            sizes="(max-width: 768px) 62px, (max-width: 1200px) 81px, 200px"
            fill
            priority
            className="rounded-full object-cover"
            alt="위키 페이지 개인 프로필 이미지"
          />
        </div>
        <div className={`mb-5 flex flex-col gap-2 overflow-hidden xl:gap-4 ${profileHeight}`}>
          {profileFields.map((field) => {
            return <ProfileInfos key={field.label} {...field} />;
          })}
        </div>
      </div>

      <div className="flex cursor-pointer justify-center" onClick={handleProfileExtend}>
        <p className=" text-md-regular xl:hidden">버튼이다</p>
      </div>
    </section>
  );
};

export default UserProfile;
