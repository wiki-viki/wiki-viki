import CustomError from '@/components/common/CustomError';
import MetaTag from '@/components/common/MetaTag';

const Custom500Error = () => {
  return (
    <>
      <MetaTag title="시스템 오류" />
      <CustomError type="500" />
    </>
  );
};

export default Custom500Error;
