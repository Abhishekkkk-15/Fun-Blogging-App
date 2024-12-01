// src/components/CommentSection.jsx

import React, { useState } from 'react';
import axios from 'axios';

const CommentSection = ({ blogId, comments }) => {
  const [commentText, setCommentText] = useState('');
  const [commentList, setCommentList] = useState(comments);

  const handleCommentSubmit = async () => {
    try {
      const response = await axios.post(`/api/blogs/addComment/${blogId}`, {
        content: commentText,
      });
      setCommentList([response.data.comment, ...commentList]);
      setCommentText('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="comment-section">
      <h3>Comments</h3>
      <div>
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
        />
        <button onClick={handleCommentSubmit}>Submit</button>
      </div>
      <ul>
        {commentList.map((comment) => (
          <li key={comment._id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;
