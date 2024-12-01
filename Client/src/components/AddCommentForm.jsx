// src/components/AddCommentForm.js

import React from 'react';

const AddCommentForm = ({ commentText, setCommentText, handleCommentSubmit }) => {
  return (
    <form onSubmit={handleCommentSubmit}>
      <textarea 
        value={commentText} 
        onChange={(e) => setCommentText(e.target.value)} 
        placeholder="Write a comment..." 
      />
      <button type="submit">Add Comment</button>
    </form>
  );
};

export default AddCommentForm;
