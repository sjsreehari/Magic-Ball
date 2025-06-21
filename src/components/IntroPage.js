// src/components/IntroPage.js
import React, { useState, useEffect } from 'react';
import './IntroPage.css';

const IntroPage = ({ onStart }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    setTimeout(() => setShowParticles(true), 500);
  }, []);

  const handleStart = () => {
    setIsVisible(false);
    setTimeout(onStart, 500);
  };

  return (
    <div className={`intro-page ${isVisible ? 'visible' : ''}`}>
      {/* Animated background particles */}
      <div className={`particles ${showParticles ? 'active' : ''}`}>
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}></div>
        ))}
      </div>

      {/* Main content */}
      <div className="intro-content">
        <div className="logo-container">
          <div className="magic-logo">🔮</div>
        </div>
        
        <h1 className="intro-title">
          <span className="title-line">Welcome to the</span>
          <span className="title-highlight">Magic Ball</span>
        </h1>
        
        <p className="intro-description">
          Ask any question and let the mystical forces reveal your destiny! 
          The Magic Ball holds ancient wisdom and cosmic insights.
        </p>
        
        <div className="features">
          <div className="feature">
            <span className="feature-icon">✨</span>
            <span>Mystical Answers</span>
          </div>
          <div className="feature">
            <span className="feature-icon">🌟</span>
            <span>Cosmic Wisdom</span>
          </div>
          <div className="feature">
            <span className="feature-icon">🔮</span>
            <span>Destiny Revealed</span>
          </div>
        </div>
        
        <button className="start-button" onClick={handleStart}>
          <span className="button-text">Begin Your Journey</span>
          <span className="button-icon">→</span>
        </button>
        
        <div className="intro-footer">
          <p>Ready to discover what the universe has in store for you?</p>
        </div>
      </div>
    </div>
  );
};

export default IntroPage;
