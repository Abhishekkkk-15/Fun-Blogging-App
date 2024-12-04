import React, { useState,useEffect } from "react";
import BottomNavbar from "./BottomNavbar";
import { getBlogs } from "../services/api";
import { useDispatch } from "react-redux";
import { setPost } from "../app/Slices/postReducer";
import { data, Link } from "react-router-dom";

const HomePage = () => {

const dispatch = useDispatch()

  const [posts,setpost] = useState([])
    useEffect(() => {
        getBlogs(1, 10)
          .then((res) => {
            setpost(res.data.data);
            console.log(res.data.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);

    const allDeatails = (post) => {
        dispatch(setPost(post))
    }   

  return (
    <div className="bg-gray-100 min-h-screen pb-16 p-6">
      <h1 className="text-2xl font-bold mb-4">Home</h1>
      <div className="space-y-6">
        {posts.map((post, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={post.coverImage}
              alt={post.title}
              className="h-40 w-full object-cover"
            />
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
              <button className="text-orange-500 mt-2 text-sm" onClick={()=>allDeatails(post)}>Read more</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
