import React from 'react';
// Handle Edit
const CommentItem = ({ comment }) => {
  const handleEdit = () => {
    console.log("Editing comment", comment.id);
  };

//   handleDelete
  const handleDelete = () => {
    console.log("Deleting comment", comment.id);
    
  };

  return (
    <div className="comment-item">
      <p><strong>{comment.user}</strong> says:</p>
      <p>{comment.text}</p>
      <p><em>{comment.date}</em></p>
      <button onClick={handleEdit}>Edite</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default CommentItem;
