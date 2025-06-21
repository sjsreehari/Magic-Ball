import React from 'react';
import './AnswerModal.css';

function AnswerModal({ answer, onClose }) {
  return (
    <div className="answer-modal-overlay" onClick={onClose}>
      <div className="answer-modal glass" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Your Magical Answer">
        <button className="answer-modal-close" onClick={onClose} aria-label="Close answer modal">✕</button>
        <div className="answer-scroll">
          <div className="answer-scroll-title">✨ Your Destiny ✨</div>
          <div className="answer-scroll-typewriter">{answer}</div>
          <div className="answer-scroll-actions">
            <button className="answer-copy-btn" aria-label="Copy answer">Copy</button>
            <button className="answer-share-btn" aria-label="Share answer">Share</button>
            <button className="answer-fav-btn" aria-label="Favorite answer">★</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnswerModal; 