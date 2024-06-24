import React, { memo } from 'react';

const ProfileInfos = memo(({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex w-fit gap-[10px]">
      <p className="min-w-14 flex-none text-xs-regular text-grayscale-400 md:text-md-regular xl:min-w-16">
        {label}
      </p>
      <p className="text-xs-regular text-grayscale-500 md:text-md-regular">{value}</p>
    </div>
  );
});

ProfileInfos.displayName = 'ProfileInfos';

export default ProfileInfos;
