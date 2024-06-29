import React from 'react';
import Spinner from '../../../public/svg/spinner.svg';

const Loading = () => {
  return (
    <div className="center h-lvh">
      <Spinner className="spinner size-10" />
    </div>
  );
};

export default Loading;
