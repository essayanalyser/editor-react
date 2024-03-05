import React from "react";

const Loader = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-900 bg-opacity-20 backdrop-blur-sm fixed top-0 left-0 z-50">
      <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500" />
    </div>
  );
};

export default Loader;
