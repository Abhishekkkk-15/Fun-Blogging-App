// src/components/BlogList.jsx
import React, { useState, useEffect } from 'react';
import { getBlogs } from '../services/api';
import BlogCard from './BlogCard';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);  // Initialize as an empty array
  const [loading, setLoading] = useState(true);  // Optional: track loading state
  const [error, setError] = useState(null);    // Optional: track error state

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getBlogs();
        console.log(response.data.data);
        
        // Ensure response.data is an array
        if (Array.isArray(response.data)) {
          setBlogs(response.data.data);
        } else {
          throw new Error('Response is not an array');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

 
  // Handle loading state
  if (loading) return <div>Loading...</div>;

  // Handle error state
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="blog-list">
      {blogs.map((blog) => (
        <BlogCard
          key={blog._id}
          blog={{
            title: blog.title,
            author: blog.author?.userName || 'Unknown', // In case author is not available
            coverImage: blog.coverImages || blog.coverImage, // Handle different naming
            commentsCount: blog.comments?.length || 0,
            likesCount: blog.likes?.length || 0
          }}
        />
      ))}
    </div>
  );
};

export default BlogList;
