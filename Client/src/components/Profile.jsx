import React, { useEffect, useState } from "react";
import { FaEdit, FaCommentDots } from "react-icons/fa"; // Icons for Edit and Message
import { useParams, Link, useNavigate } from "react-router-dom";
import { follow, getBlog, getProfile, unFollow } from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../app/Slices/userSlice";
import Masonry from 'react-masonry-css'; // Import Masonry

export default function ProfileComponent() {
  const [user, setProfileUser] = useState({});
  const { identifier } = useParams();
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const logedUser = useSelector((state) => state.user.userData);
  const [notLogged, setNotLoged] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        // Fetch user profile
        const profileRes = await getProfile(identifier);
        setProfileUser(profileRes.data.data);

        // Fetch user posts
        const blogRes = await getBlog(identifier);
        setPost(blogRes.data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })();
  }, [identifier, logedUser]);

  const handleFollowing = async () => {
    if (!logedUser) {
      setNotLoged(true)
      setTimeout(() => {
        setNotLoged(false)
      }, 1000);
      return null
    }
    try {
      if (logedUser?.following?.some((res) => res === user?._id || user?.userId)) {
        await unFollow(user?._id).then((res) => {
          console.log(res);
          dispatch(setUser(res.data.data));
        }).catch(err => console.log(err));
      } else {
        await follow(user._id).then((res) => {
          console.log(res);
          dispatch(setUser(res.data.data));
        }).catch((error) => console.log(error));
      }
    } catch (error) {
      console.error(error);
    }
  };

  if(!logedUser){
    navigate('/login',{state:"Login first"})
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-start p-4 space-y-6">
      {/* Profile Picture and Info */}
      <div className="text-center space-y-1">
      {notLogged && (
  <span
    className="bg-gray-400 h-8 w-36 text-white z-50 fixed ml-24 mt-20 text-center rounded-full transition ease-in-out duration-1000"
    role="alert"
  >
    Login First!!
  </span>
)}
        <div className="relative">
          <img
            src={user?.avatar}
            alt="Profile"
            className="w-24 h-24 md:w-28 md:h-28 rounded-full mx-auto"
          />
        </div>
        <h2 className="text-lg md:text-2xl font-bold text-gray-800">{user?.name || "User"}</h2>
        <p className="text-sm text-gray-500">@{user?.userName || "username"}</p>
        <p className="text-gray-600 text-sm">{user?.bio}</p>
        <div className="flex justify-center items-center space-x-6">
          <div className="text-center">
            <p className="text-lg font-bold">{post?.length || 0}</p>
            <p className="text-gray-500 text-sm">Blogs</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold">{user?.followers?.length || 0}</p>
            <p className="text-gray-500 text-sm">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold">{user?.following?.length || 0}</p>
            <p className="text-gray-500 text-sm">Following</p>
          </div>
        </div>
      </div>

      {/* Buttons Section */}
      <div className="flex space-x-4">
        <button
          className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg text-sm md:text-base hover:from-blue-600 hover:to-purple-600 transition"
          onClick={handleFollowing}
        >
          {logedUser?.following?.some((res) => res === user?._id) ? "Unfollow" : "Follow"}
        </button>
        <button className="flex items-center px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
          <FaCommentDots className="mr-2 text-gray-700" /> Message
        </button>
      </div>

      {/* Masonry Image Grid */}
      <div className="w-full mt-6 mb-14">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(9)].map((_, index) => (
              <div key={index} className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-md"></div>
            ))}
          </div>
        ) : (
          <Masonry
            breakpointCols={{ 320: 2, 480: 2, 768: 3, 1024: 4 }}
            className="flex gap-4"
            columnClassName="masonry-column"
          >
            {post?.length > 0 ? (
              post.map((post, index) => (
                <Link
                  to={`/details/${post._id}`}
                  key={index}
                  className="overflow-hidden rounded-md shadow-sm hover:shadow-lg transition "
                >
                  <img
                    src={post?.coverImage}
                    alt={`Post ${index + 1}`}
                    className="w-full h-auto object-cover rounded-md mb-5"
                  />
                </Link>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center col-span-full">No Posts</p>
            )}
          </Masonry>
        )}
      </div>
    </div>
  );
}
