// src/components/LikeButton.jsx

import React, { useState } from 'react';
import axios from 'axios';

const LikeButton = ({ blogId, likesCount, setLikesCount }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = async () => {
    try {
      if (isLiked) {
        await axios.delete(`/api/blogs/unlike/${blogId}`); // Unliking logic
        setLikesCount(likesCount - 1);
      } else {
        await axios.post(`/api/blogs/like/${blogId}`); // Liking logic
        setLikesCount(likesCount + 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Error liking the blog:', error);
    }
  };

  return (
    <button onClick={handleLike}>
      {isLiked ? 'Unlike' : 'Like'} ({likesCount})
    </button>
  );
};

export default LikeButton;
