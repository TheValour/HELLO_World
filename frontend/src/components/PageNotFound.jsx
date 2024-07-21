import React from 'react';

const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600">404</h1>
        <p className="text-lg text-gray-800">Page Not Found</p>
      </div>
    </div>
  );
};

export default PageNotFound;
