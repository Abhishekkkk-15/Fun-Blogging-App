import React, { useState,useEffect } from "react";
import { getBlogs, getUserInfo } from "../services/api";
import { useDispatch,useSelector } from "react-redux";
import { setPost } from "../app/Slices/postReducer";
import { Link } from "react-router-dom";
import { setLoggedIn, setUser } from "../app/Slices/userSlice";
useSelector

const HomePage = () => {
  
  const user = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getBlogs(1, 10); 
        setPosts(response.data.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []); 


  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!user) { 
        try {
          const response = await getUserInfo(); 
          const userInfo = response.data.userInfo;
          dispatch(setUser(userInfo));
          dispatch(setLoggedIn(true));
        } catch (error) {
          // console.error("Error fetching user info:", error);
        }
      }
    };
    fetchUserInfo();
  }, [dispatch,user]);



  const handlePostDetails = (post) => {
    dispatch(setPost(post));
  };

  return (
    <div className="bg-gray-100 min-h-screen pb-16 p-6">
      <h1 className="text-2xl font-bold mb-4">Home</h1>
      <div className="space-y-6">
        {posts.slice().reverse().map((post, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <Link to="/details">
            <img
              src={post.coverImage}
              alt={post.title}
              className="h-40 w-full object-cover"
              onClick={()=>handlePostDetails(post)}
            />
            </Link>
            <div className="p-4">
              <div className="flex items-center space-x-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.userName}
                  className="w-12 h-12 rounded-full"
                />
                <span className="text-sm font-semibold">{post.author.userName}</span>
              </div>
              <h3 className="text-xl font-semibold mt-2">{post.title}</h3>
              <p className="text-gray-600 mt-2 text-sm">
                {post.description.slice(0, 100)}...
              </p>
              <Link to="/details">
              <button
            className="text-purple-500 hover:text-blue-500 focus:text-purple-500 mt-2 text-sm transition"
            onClick={() => handlePostDetails(post)}
                >Read more   
        </button>
        </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
