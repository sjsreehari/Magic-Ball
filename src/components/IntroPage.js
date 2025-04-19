// src/components/IntroPage.js
import React from 'react';
import './IntroPage.css';

const IntroPage = ({ onStart }) => {
  return (
    <div className="intro-page">
      <h1>🔮 Welcome to the Magic Ball</h1>
      <p>Ask any question and let the magic ball reveal your destiny!</p>
      <button onClick={onStart}>Start</button>
    </div>
  );
};

export default IntroPage;
