// src/components/CommentList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CommentForm from './CommentForm';
import './CommentList.css';

const CommentList = () => {
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [replyingTo, setReplyingTo] = useState(null);
  const commentsPerPage = 25;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/comments/');
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, []);

  const handleReply = (commentId) => {
    setReplyingTo(commentId);
  };

  const handleCancelReply = () => {
    setReplyingTo(null);
  };

  const handleAddReply = async (newReply, parentId) => {
    try {
      const response = await axios.post('http://localhost:8000/api/comments/', {
        ...newReply,
        parent_id: parentId,
      });

      setComments((prevComments) => [...prevComments, response.data]);
      setReplyingTo(null);
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  };

  const renderComments = Array.isArray(comments)
    ? comments.map((comment) => (
        <div key={comment.id} className={`comment ${replyingTo === comment.id ? 'replying' : ''}`}>
          <div className="comment-header">
            <p>By: {comment.user_name}</p>
            <p>Added on: {new Date(comment.created_at).toLocaleString()}</p>
          </div>
          <div className="comment-text">
            <p>{comment.text}</p>
            <button onClick={() => handleReply(comment.id)}>Reply</button>
            {replyingTo === comment.id && (
              <>
                <span className="replying-to">Replying to comment by {comment.user_name}</span>
                <button onClick={handleCancelReply}>Cancel Reply</button>
              </>
            )}
            {replyingTo === comment.id && (
              <CommentForm onSubmit={(newComment) => handleAddReply(newComment, comment.id)} replyingTo={replyingTo} />
            )}
          </div>
          <hr />
        </div>
      ))
    : null;

  return (
    <div className="comment-list">
      {renderComments}
      <div>
        <button onClick={() => setCurrentPage(currentPage - 1)}>Previous Page</button>
        <span> Page {currentPage} </span>
        <button onClick={() => setCurrentPage(currentPage + 1)}>Next Page</button>
      </div>
    </div>
  );
};

export default CommentList;
