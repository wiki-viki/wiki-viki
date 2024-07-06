import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import CameraIcon from '@/../public/svg/camera_icon.svg';

interface EditProfileProps {
  isMyPage: boolean;
  onChange: (name: string, value: string | File | null) => void;
  value: string | File | null;
}

const EditProfile = ({ onChange, value, isMyPage }: EditProfileProps) => {
  const [preview, setPreview] = useState<string | StaticImport | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextImg = e.target.files?.[0];
    if (nextImg) {
      onChange('image', nextImg);
    }
  };

  const handleClearClick = useCallback(() => {
    setPreview(null);
    onChange('image', null);
  }, [onChange]);

  useEffect(() => {
    let objectUrl: string | null = null;
    if (!value) {
      setPreview(null);
      return;
    }

    if (typeof value === 'string' && value.includes('http')) {
      setPreview(value);
    } else {
      const blob = typeof value === 'string' ? new Blob([value], { type: 'text/plain' }) : value;
      objectUrl = URL.createObjectURL(blob);
      setPreview(objectUrl);
    }

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [value]);

  return (
    <>
      <label
        htmlFor="fileInput"
        // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
        className="center group relative mx-auto size-[71px] cursor-pointer rounded-full border-2 border-grayscale-100 hover:bg-black hover:bg-opacity-20 xl:size-[200px]"
      >
        <CameraIcon className="z-10 text-white group-hover:brightness-50" />
        {preview && (
          <Image
            className="rounded-full group-hover:brightness-50"
            alt="프로필 이미지 미리보기"
            src={preview}
            fill
            style={{ objectFit: 'cover' }}
          ></Image>
        )}
      </label>

      {preview && isMyPage && (
        <button
          className="absolute text-white sm:right-0 md:right-0 xl:left-[245px] xl:top-[-25px]"
          onClick={handleClearClick}
        >
          <span className="rounded-full bg-primary-green-200 px-[6px] py-[2px]">X</span>
        </button>
      )}

      <input
        type="file"
        id="fileInput"
        className="hidden"
        onChange={handleFileChange}
        accept=".png, .jpg, .jpeg"
      ></input>
    </>
  );
};

export default EditProfile;
