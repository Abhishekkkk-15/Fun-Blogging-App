import { article } from 'framer-motion/client';
import React from 'react';
import { FaHeart, FaRegComment } from 'react-icons/fa'; // Import icons for like and comment
import { useSelector } from 'react-redux';

export default function ArticleDetails() {

  const singleArticle = useSelector((state) => state.article.articles)
  console.log("data",singleArticle);
  
  return (
    <div className="bg-white flex flex-col md:flex-row p-8 max-w-5xl mx-auto rounded-lg shadow-md">
      {/* Left Section: Image */}
      <div className="w-full md:w-1/2">
        <img
          src={singleArticle.coverImage}
          alt={singleArticle.title}
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      Right Section: Article Details
      <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
        {/* Article Title */}
        <h1 className="text-3xl font-bold mb-4">{singleArticle.title}</h1>

        {/* Author Profile */}
        <div className="flex items-center mb-6">
          <img
            src={singleArticle.author.avatar}  
            alt={singleArticle.author.userName}
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <p className="text-sm font-semibold">{singleArticle.author.userName}</p>
            <p className="text-sm text-gray-500">{singleArticle.date}</p>
          </div>
        </div>

        {/* Article Description */}
        <p className="text-gray-700 text-sm mb-6">{singleArticle.description}</p>

        {/* Like and Comment Section */}
        <div className="flex items-center space-x-6">
          {/* Like Button */}
          <div className="flex items-center cursor-pointer">
            <FaHeart className="text-red-500 mr-2" />
            {/* <span className="text-sm font-semibold">{singleArticle.likes} Likes</span> */}
          </div>

          {/* Comment Button */}
          <div className="flex items-center cursor-pointer">
            <FaRegComment className="text-gray-500 mr-2" />
            {/* <span className="text-sm font-semibold">{singleArticle.comments.content} Comments</span> */}
          </div>
        </div>
      </div>
    </div>
  );
}
