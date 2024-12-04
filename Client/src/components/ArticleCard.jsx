import React, { useState } from 'react';
import ArticleDetails from './ArticleDetails';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { set } from 'date-fns';
import {  setArticles } from '../app/Slices/postReducer';
export default function ArticleCard({ article }) {
  
  const [isClicked, setIsClicked] = useState(false);
  const dispatch = useDispatch()
   
  const readM = (data) =>{
    dispatch(setArticles(data))
  }

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Article Image */}
      <img
        src={article.coverImage}
        alt={article.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        {/* Category */}
        <p className="text-xs uppercase text-gray-500 mb-2">{article.category}</p>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-2">{article.title}</h2>

        {/* Date and Author */}
        <p className="text-sm text-gray-500">{article.date}</p>
        <p className="text-sm text-gray-500 mt-2">
          Text: {article.author.userName} | Duration: {article.createdAt}
        </p>

        {/* Read More */}
        <Link to="/details">
        <p
          className="mt-4 text-sm font-bold text-blue-600 hover:underline cursor-pointer"
          onClick={()=>readM(article)}
        >
          Read more...
        </p></Link>
      </div>
    </div>
  );
}
