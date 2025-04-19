import React, { useState, useEffect } from 'react';
import { getMistralResponse } from '../api';
import './MagicBall.css';

const MagicBall = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAsk = async () => {
    if (!question.trim()) {
      setError('Please enter a question.');
      return;
    }

    setError(null);
    setLoading(true);
    try {
      const reply = await getMistralResponse(question);
      setAnswer(reply);
    } catch (err) {
      setError('Failed to fetch answer.');
    }
    setLoading(false);
  };

  // ⭐️ Star field generator
  useEffect(() => {
    const container = document.querySelector('.star-field-container');
    if (!container) return;

    container.innerHTML = ""; // clear old stars
    for (let i = 0; i < 50; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 3}s`;
      const size = Math.random() * 3 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      container.appendChild(star);
    }
  }, [answer]);


  return (
    <div className="magic-ball-container">
        
      {/* ⭐️ Star background */}
      <div className={`star-field-container ${answer ? 'active' : ''}`}></div>

      <div className="magic-ball" onClick={handleAsk}>
        <div className="ball">
          <div className="ball-inner">
            {loading ? 'Thinking...' : 'Click the ball!'}
          </div>
        </div>
      </div>

      <div className="input-container">
        <input
          type="text"
          placeholder="Ask your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button onClick={handleAsk}>Ask</button>
      </div>

      {error && <div className="error">{error}</div>}

      {/* Display answer outside the ball */}
      {answer && (
        <div className="answer-container">
          <strong>Answer:</strong> {answer}
        </div>
      )}
    </div>
  );
};

export default MagicBall;
