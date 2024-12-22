import React from "react";
import { Link } from "react-router-dom";

const BottomNavbar = () => {
  return (
    <div className="fixed z-50 bottom-0 left-0 w-full p-4 shadow-md flex justify-around bg-base-100">
      <Link to="/">
        <button className="hover:text-blue-500 focus:text-purple-500 transition">
          <i className="fa-solid fa-house"></i>
          <span className="sr-only">Home</span>
        </button>
      </Link>
      <Link to="/search">
        <button className="hover:text-blue-500 focus:text-purple-500 transition">
          <i className="fa-solid fa-magnifying-glass"></i>
          <span className="sr-only">Search</span>
        </button>
      </Link>
      <Link to="/add-blog">
        <button className="hover:text-blue-500 focus:text-purple-500 transition">
          <i className="fa-solid fa-plus"></i>
          <span className="sr-only">Add</span>
        </button>
      </Link>
      <Link to="/message">
        <button className="hover:text-blue-500 focus:text-purple-500 transition">
          <i className="fa-regular fa-message"></i>
          <span className="sr-only">Message</span>
        </button>
      </Link>
      <Link to="/login">
        <button className="text-gray-500 hover:text-blue-500 focus:text-purple-500 transition">
          <i className="fa-solid fa-user"></i>
          <span className="sr-only">Login</span>
        </button>
      </Link>
    </div>
  );
};

export default BottomNavbar;
