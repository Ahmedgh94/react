import React, { useState } from 'react';

const CommentForm = ({ addComment }) => {
  const [commentText, setCommentText] = useState('');

  const handleChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment(commentText); // send the new comment 
    setCommentText(''); // reset the main text area
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea 
        value={commentText} 
        onChange={handleChange} 
        placeholder="Write a comment..."
        required 
      />
      <button type="submit">Add comment</button>
    </form>
  );
};

export default CommentForm;
