import CustomError from '@/components/common/CustomError';
import MetaTag from '@/components/common/MetaTag';

const Custom404Error = () => {
  return (
    <>
      <MetaTag title="404" />
      <CustomError type="404" />
    </>
  );
};

export default Custom404Error;
