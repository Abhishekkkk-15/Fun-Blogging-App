// src/components/BlogCard.js
import React from 'react';
import './Css/BlogCard.css';  // Import the styles for BlogCard

const BlogCard = ({ blog }) => {
  console.log("Blog in blog card : ",blog);
  
  return (
    <div className="blog-card">
      <img src={blog.coverImages || blog.coverImage} alt={blog.title} className="blog-image" />
      <div className="blog-info">
        <h3 className="blog-title">{blog.title}</h3>
        <p className="blog-author">by {blog.author.userName}</p>
        <div className="blog-comments">
          <p><strong>Comments:</strong></p>
          {blog.comments.map((comment) => (
            <p key={comment._id}>{comment.content}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
