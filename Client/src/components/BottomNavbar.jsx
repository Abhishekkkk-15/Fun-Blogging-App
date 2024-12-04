import React from "react";

const BottomNavbar = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white p-4 shadow-md flex justify-around">
      <button className="text-gray-500 focus:text-orange-500">
        🏠
        <span className="sr-only">Home</span>
      </button>
      <button className="text-gray-500 focus:text-orange-500">
        🔍
        <span className="sr-only">Search</span>
      </button>
      <button className="text-gray-500 focus:text-orange-500">
        📃
        <span className="sr-only">Saved</span>
      </button>
      <button className="text-gray-500 focus:text-orange-500">
        👤
        <span className="sr-only">Profile</span>
      </button>
    </div>
  );
};

export default BottomNavbar;
