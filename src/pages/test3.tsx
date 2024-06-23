import React, { useState } from 'react';
import LinkButton from '@/components/common/LinkButton';
import ToastSelect from '@/components/common/ToastSelect';
import 'react-toastify/dist/ReactToastify.css';
import { StyledToastContainer } from '@/styles/ToastStyle';

const url = 'https://www.youtube.com/';

const Test3 = () => {
  const [type, setType] = useState('check');

  const handleTypeChange = (e: string) => {
    setType(e);
  };

  const handleShowToast = () => {
    ToastSelect({ type });
  };

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

      <div> 현재 type : {type}</div>

      <div className=" m-5">
        <button
          onClick={() => {
            handleTypeChange('notification');
          }}
        >
          Notification
        </button>
        <button
          onClick={() => {
            handleTypeChange('check');
          }}
        >
          check
        </button>
        <button
          onClick={() => {
            handleTypeChange('error');
          }}
        >
          Error
        </button>

        <button onClick={handleShowToast}>Click me</button>
        <StyledToastContainer limit={1} />
      </div>
    </>
  );
};

export default Test3;
