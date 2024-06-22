import React from 'react';
import LinkButton from '@/components/common/LinkButton';
import SnackBar from '@/components/common/SnackBar';

const url = 'https://www.youtube.com/';

const Test3 = () => {
  return (
    <>
      <div className=" m-5">
        <LinkButton url={url} />
      </div>
      <div className=" m-5">
        <LinkButton url="https://www.youtube." />
      </div>
      <div className=" m-5">
        <LinkButton url="adsfasdfasfd" />
      </div>

      <div className=" m-5">
        <SnackBar type="notification" />
      </div>
      <div className=" m-5">
        <SnackBar type="check" />
      </div>
      <div className=" m-5">
        <SnackBar type="error" />
      </div>
    </>
  );
};

export default Test3;
