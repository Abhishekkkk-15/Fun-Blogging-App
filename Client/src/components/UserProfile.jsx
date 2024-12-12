import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa'; // Icon for Edit
import { HiDotsVertical } from 'react-icons/hi'; // Icon for Menu
import { useDispatch, useSelector } from 'react-redux';
import { Menu, Transition } from '@headlessui/react'; // For dropdown functionality
import { deletePost, getBlog, logout } from '../services/api';
import { setLoggedIn, setUser } from '../app/Slices/userSlice';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import Masonry from 'react-masonry-css'; // Import react-masonry-css for the masonry layout

export default function UserProfile({ log }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user?.userData);
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [tryToDelete,setTryToDelete] = useState(false)
  const [userPosts, setUserPosts] = useState([]);

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
    setLoading(true);
    const fetchBlogs = async () => {
      try {
        const res = await getBlog(user?.userId || user?._id);
        setUserPosts(res.data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        return null;
      }
    };

    fetchBlogs();
  }, [user,tryToDelete]);

  const handleUserUpdate = (user) => {
    navigate('/edit-profile', { state: { user } });
  };

  const handleDelete = async(blogId) =>{
    console.log(blogId)
    await deletePost(blogId).then(res => {
      console.log(res)
      setTryToDelete(true)
    })
    .catch(err => console.log(err))
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
                    className={`${active ? 'bg-gray-100' : ''} group flex rounded-md items-center w-full px-4 py-2 text-sm text-gray-700`}
                  >
                    Account
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${active ? 'bg-gray-100' : ''} group flex rounded-md items-center w-full px-4 py-2 text-sm text-gray-700`}
                  >
                    Contact Us
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${active ? 'bg-gray-100' : ''} group flex rounded-md items-center w-full px-4 py-2 text-sm text-red-600`}
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
        <h2 className="text-lg font-bold text-gray-800">{user?.name}</h2>
        <p className="text-sm text-gray-500">@{user?.userName}</p>
        <p className="text-gray-600 text-sm mt-1 mb-1">{user?.bio}</p>

        <button className="flex items-center px-4 py-2 m-auto bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg text-sm md:text-base hover:from-blue-600 hover:to-purple-600 transition"
          onClick={() => { handleUserUpdate(user) }} >
          <FaEdit className="mr-2" /> Edit Profile
        </button>
      </div>

      {/* Stats Section */}
      <div className="flex justify-around w-full mt-6">
        <div className="text-center cursor-pointer">
          <p className="text-xl font-bold">{user?.followers?.length || 0}</p>
          <p className="text-gray-500 text-sm">Followers</p>
        </div>
        <div className="text-center cursor-pointer">
          <p className="text-xl font-bold">{user?.following?.length || 0}</p>
          <p className="text-gray-500 text-sm">Following</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold">{userPosts.length}</p>
          <p className="text-gray-500 text-sm">Blogs</p>
        </div>
      </div>

      {/* Image Grid with Masonry Layout */}
      <div className="mt-6 mb-14 w-full overflow-scroll h-96">
        <Masonry
          breakpointCols={{
            default: 4, // 4 columns for large screens
            1024: 3,    // 3 columns for medium screens
            768: 2,     // 2 columns for small screens
            480: 2,     // 1 column for extra small screens
          }}
          className="flex w-full gap-4"
          columnClassName="masonry-column"
        >
          {userPosts?.length > 0 ? (
            userPosts.map((post, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-md shadow-sm hover:shadow-lg transition mb-5"
              >
                <Link to={`/details/${post._id}`}>
                  <img
                    src={post?.coverImage}
                    alt={`Post ${index + 1}`}
                    className="w-full h-full object-cover rounded-md"
                  />
                </Link>
                {/* Dropdown Menu */}
                <Menu as="div" className="absolute top-2 right-2 z-10">
                  <Menu.Button className="flex items-center justify-center w-8 h-8 bg-gray-900 bg-opacity-50 rounded-full focus:outline-none">
                    <HiDotsVertical className="text-white text-xl" />
                  </Menu.Button>
                  <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute  right-0 mt-2 w-32 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => console.log("Share post:", post._id)}
                            className={`${active ? 'bg-gray-100' : ''} flex items-center w-full px-4 py-2 text-sm text-gray-700`}
                          >
                            Share
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => handleDelete(post?._id)}
                            className={`${active ? 'bg-gray-100' : ''} flex items-center w-full px-4 py-2 text-sm text-red-600`}
                          >
                            Delete
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 text-center ml-32">No Posts</p>
          )}
        </Masonry>
        {loading && (
          <Masonry
          breakpointCols={{
            default: 4, // 4 columns for large screens
            1024: 3,    // 3 columns for medium screens
            768: 2,     // 2 columns for small screens
            480: 2,     // 1 column for extra small screens
          }}
          className="flex w-full gap-4"
          columnClassName="masonry-column"
        >
          {/* Show Loading Placeholders */}
          {loading && (
            Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="h-64 bg-gray-200 animate-pulse rounded-md"
              ></div>
            ))
          ) }
        </Masonry>
        )}
      </div>
    </div>
  );
}
