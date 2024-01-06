// src/components/Lightbox.js
import React from 'react';
import './Lightbox.css';

const Lightbox = ({ src, onClose }) => {
  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-content">
        <button className="lightbox-close" onClick={onClose}>
          Закрыть
        </button>
        {src && <img src={src} alt="Lightbox Image" />}
      </div>
    </div>
  );
};

export default Lightbox;
