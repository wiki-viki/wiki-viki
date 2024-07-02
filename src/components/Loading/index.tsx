import React from 'react';
import Spinner from '@/../public/svg/spinner.svg';

const Loading = () => {
  return (
    <div className="center loading">
      <Spinner className="spinner size-10" />
    </div>
  );
};

export default Loading;
