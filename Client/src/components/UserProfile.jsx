import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa'; // Icon for Edit
import { HiDotsVertical } from 'react-icons/hi'; // Icon for Menu
import { useDispatch, useSelector } from 'react-redux';
import { Menu, Transition } from '@headlessui/react'; // For dropdown functionality
import { getBlog, logout } from '../services/api';
import { setLoggedIn, setUser } from '../app/Slices/userSlice';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { setPost } from '../app/Slices/postReducer';

export default function UserProfile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.userData);
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [userPosts , setUserPosts] = useState([])  
  const userId = user?.userId 
  const handleLogOut = async () => {
    await logout()
      .then(() => {
        dispatch(setUser(null)); // Clear user state
        dispatch(setLoggedIn(false)); 
        navigate('/login'); 

      })
      .catch(() => {
        console.log('Error while logging out user!');
      });
  };

  useEffect(() => {
    const fetchBlogs = async () => {
        try {
          const res = await getBlog(userId);
          setUserPosts(res.data.data); //
          console.log("Fetched blogs:", res.data.data);
        } catch (error) {
          console.error("Error fetching blogs:", error);
        }
    };

    fetchBlogs();
  }, [user]);

const blogDetails = (post) =>{
    dispatch(setPost(post))
}

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-4">
      {/* Top Section */}
      <div className="flex justify-end items-center w-full px-4">
        {/* Menu Dropdown */}
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full focus:outline-none">
            <HiDotsVertical className="text-gray-600 text-xl" />
          </Menu.Button>
          <Transition
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-gray-100' : ''
                    } group flex rounded-md items-center w-full px-4 py-2 text-sm text-gray-700`}
                  >
                    Account
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-gray-100' : ''
                    } group flex rounded-md items-center w-full px-4 py-2 text-sm text-gray-700`}
                  >
                    Contact Us
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-gray-100' : ''
                    } group flex rounded-md items-center w-full px-4 py-2 text-sm text-red-600`}
                    onClick={handleLogOut}
                  >
                    Sign Out
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>

      {/* Profile Section */}
      <div className="text-center mt-6">
        <img
          src={user?.avatar}
          alt="Profile"
          className="w-24 h-24 rounded-full mx-auto"
        />
        <h2 className="text-lg font-bold text-gray-800">{user?.userName}</h2>
        <p className="text-sm text-gray-500">@{user?.email}</p>
        <p className="text-gray-600 text-sm mt-2">{user?.bio}</p>
        <button className="flex items-center px-4 py-2 m-auto bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg text-sm md:text-base hover:from-blue-600 hover:to-purple-600 transition">
              <FaEdit className="mr-2" /> Edit Profile
            </button>
      </div>

      {/* Stats Section */}
      <div className="flex justify-around w-full mt-6">
        <div className="text-center">
          <p className="text-xl font-bold">{userPosts.length}</p>
          <p className="text-gray-500 text-sm">Posts</p>
        </div>
      </div>

      {/* Image Grid */}
      {/* Image Grid with Masonry Layout */}
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full mt-6 mb-14">
  {userPosts?.length > 0
    ? userPosts.map((post, index) => (
        <Link
          to="/details"
          key={index}
          onClick={() => blogDetails(post)}
          className="overflow-hidden rounded-md shadow-sm hover:shadow-lg transition"
        >
          <img
            src={post?.coverImage}
            alt={`Post ${index + 1}`}
            className="w-full h-auto object-cover rounded-md"
          />
        </Link>
      ))
    : [...Array(9)].map((_, index) => (
        <div
          key={index}
          className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-md"
        >
          <img
            src={`https://via.placeholder.com/150?text=Img${index + 1}`}
            alt={`Placeholder ${index + 1}`}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
      ))}
</div>

    </div>
  );
}
