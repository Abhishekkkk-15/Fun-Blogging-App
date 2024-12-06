import React from "react";
import { FaEdit, FaCommentDots } from "react-icons/fa"; // Icons for Edit and Message
import { useSelector } from "react-redux";

export default function ProfileComponent() {
  const user = useSelector((state) => state.user?.userData);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-start p-4 space-y-6">
      {/* Profile Picture */}
      <div className="text-center space-y-4">
        <img
          src={user?.avatar}
          alt="Profile"
          className="w-28 h-28 rounded-full mx-auto"
        />
        <h2 className="text-2xl font-bold text-gray-800">{user?.userName}</h2>
        <p className="text-sm text-gray-500">@{user?.email}</p>
        <p className="text-gray-600 text-sm px-6">{user?.bio}</p>
      </div>

      {/* Buttons Section */}
      <div className="flex space-x-4">
        <button className="flex items-center px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg hover:from-orange-600 hover:to-yellow-600 transition">
          <FaEdit className="mr-2" /> Edit Profile
        </button>
        <button className="flex items-center px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
          <FaCommentDots className="mr-2 text-gray-700" /> Message
        </button>
      </div>

      {/* Stats Section */}
      <div className="flex justify-center space-x-8">
        <div className="text-center">
          <p className="text-xl font-bold">100</p>
          <p className="text-gray-500 text-sm">Posts</p>
        </div>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-3 gap-2 w-full max-w-lg">
        {[...Array(9)].map((_, index) => (
          <div key={index} className="w-full h-28">
            <img
              src={`https://via.placeholder.com/150?text=Img${index + 1}`}
              alt={`Post ${index + 1}`}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
