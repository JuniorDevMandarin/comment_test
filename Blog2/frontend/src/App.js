// src/App.js
import React from 'react';
import CommentForm from './components/CommentForm';
import CommentList from './components/CommentList';
import './App.css'
const App = () => {
  const handleCommentSubmit = (newComment) => {
    // Обновляем список комментариев после успешного добавления
    // Может потребоваться дополнительная логика обновления состояния комментариев
  };

  return (
    <div className='App'>
      <h1>SPA-приложение комментариев</h1>
      <CommentForm onSubmit={handleCommentSubmit} />
      <CommentList />
    </div>
  );
};

export default App;
