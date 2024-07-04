import React, { ChangeEvent, memo } from 'react';

const ProfileInfos = memo(
  ({
    label,
    value,
    id,
    onChange,
    editMyPage,
  }: {
    label: string;
    value: string;
    id: string;
    onChange: (name: string, value: string | File | null) => void;
    editMyPage: boolean;
  }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      onChange(id, value);
    };

    return (
      <div
        className={`flex h-7 w-full items-center ${editMyPage ? 'justify-center md:mx-auto xl:mb-1' : ''} gap-[10px]`}
      >
        {editMyPage ? (
          <>
            <label
              htmlFor={id}
              className="min-w-14 flex-none text-xs-regular text-grayscale-400 md:text-md-regular xl:min-w-16"
            >
              {label}
            </label>
            <input
              name="profileInput"
              id={id}
              maxLength={13}
              className="flex-none rounded-10 bg-grayscale-100 py-2 pl-3 text-xs-regular text-grayscale-400 outline-none focus:border-2 focus:border-primary-green-200 sm:w-[70%] md:ml-2 md:w-[70%] md:text-md-regular lg:ml-0 lg:w-3/4 xl:w-[68%] xl:min-w-16"
              placeholder={value}
              onChange={handleChange}
            />
          </>
        ) : (
          <>
            <p className="min-w-14 flex-none text-xs-regular text-grayscale-400 md:text-md-regular xl:min-w-16">
              {label}
            </p>
            <p className="text-xs-regular text-grayscale-500 md:text-md-regular">{value}</p>
          </>
        )}
      </div>
    );
  },
);

ProfileInfos.displayName = 'ProfileInfos';

export default ProfileInfos;
