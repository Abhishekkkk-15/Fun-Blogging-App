import React from 'react';
import ArticleCard from './ArticleCard';
import { useState,useEffect } from 'react';
import { getBlogs } from '../services/api';

export default function MagazineLayout() {

  const [articles, setArticals] = useState([]);

  useEffect(() => {
    getBlogs(1, 10)
      .then((res) => {
        setArticals(res.data.data);
        console.log(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  return (
    <div className="bg-white text-black min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        {/* Category Filters */}
        <div className="flex space-x-6 text-sm mb-8">
          <button className="text-black border-b-2 border-black pb-1">All</button>
          <button className="text-gray-500 hover:text-black">Art</button>
          <button className="text-gray-500 hover:text-black">Street Art</button>
          <button className="text-gray-500 hover:text-black">Sculpture</button>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article,index) => (
            <ArticleCard key={index} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
}
