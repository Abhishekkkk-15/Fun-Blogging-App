import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const userInfo = useSelector((state) => state.user.userData);
  const navigate = useNavigate();

  return (
    <div className="p-6 max-w-3xl mx-auto bg-gradient-to-br from-gray-100 to-gray-200 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Account Settings</h2>

      {userInfo && (
        <div className="flex flex-col items-center mb-10">
          <img
            src={userInfo.avatar}
            alt={userInfo.name}
            className="w-24 h-24 rounded-full border-4 border-blue-500 mb-4"
          />
          <div className="text-lg text-gray-800 text-center space-y-2">
            <p>
              <span className="font-semibold">Name: </span>{userInfo.name}
            </p>
            <p>
              <span className="font-semibold">Username: </span>@{userInfo.userName}
            </p>
            <p>
              <span className="font-semibold">Email: </span>{userInfo.email}
            </p>
          </div>
        </div>
      )}

      <button
        onClick={() => navigate('/change-password')}
        className="flex items-center px-4 py-2 m-auto bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg text-sm md:text-base hover:from-blue-600 hover:to-purple-600 transition"
      >
        Change Password
      </button>
    </div>
  );
};

export default Account;
