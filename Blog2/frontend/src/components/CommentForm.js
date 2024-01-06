// src/components/CommentForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './CommentForm.css';

const CommentForm = ({ onSubmit, replyingTo }) => {
  const [user_name, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [home_page, setHomePage] = useState('');
  const [captcha_code, setCaptchaCode] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('user_name', user_name);
    formData.append('email', email);
    formData.append('home_page', home_page);
    formData.append('captcha_code', captcha_code);
    formData.append('text', text);
    if (image) {
      formData.append('image', image);
    }
    if (file) {
      formData.append('file', file);
    }

    try {
      const response = await axios.post('http://localhost:8000/api/comments/', formData);

      onSubmit(response.data);
      setUserName('');
      setEmail('');
      setHomePage('');
      setCaptchaCode('');
      setText('');
      setImage(null);
      setFile(null);
      window.location.reload();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <div>
        <label>User Name:</label>
        <input
          type="text"
          value={user_name}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Home Page:</label>
        <input
          type="url"
          value={home_page}
          onChange={(e) => setHomePage(e.target.value)}
        />
      </div>

      <div>
        <label>CAPTCHA:</label>
        <input
          type="text"
          value={captcha_code}
          onChange={(e) => setCaptchaCode(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Text:</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
      </div>

      <div>
        <label>Image (not more than 320x240):</label>
        <input type="file" accept="image/jpeg, image/png, image/gif" onChange={(e) => setImage(e.target.files[0])} />
      </div>

      <div>
        <label>Text File (not more than 100 KB, TXT format):</label>
        <input type="file" accept=".txt" onChange={(e) => setFile(e.target.files[0])} />
      </div>

      <button type="submit">Add Comment</button>
    </form>
  );
};

export default CommentForm;
