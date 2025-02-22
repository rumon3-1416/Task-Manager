import React from 'react';
import Lottie from 'lottie-react';
import loading from './task-loading.json';

const Loading = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <Lottie className="h-32" animationData={loading} />
    </div>
  );
};

export default Loading;
