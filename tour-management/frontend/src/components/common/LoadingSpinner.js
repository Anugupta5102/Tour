import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

const LoadingSpinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#4fa94d"
        ariaLabel="loading"
      />
    </div>
  );
};

export default LoadingSpinner;
