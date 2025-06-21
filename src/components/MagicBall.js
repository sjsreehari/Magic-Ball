import React, { useState, useEffect, useRef } from 'react';
import { getMistralResponse } from '../api';
import { useSoundEffects, hapticFeedback } from './SoundEffects';
import { speak, startListening, stopListening } from './SpeechUtils';
import './MagicBall.css';

const MagicBall = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isShaking, setIsShaking] = useState(false);
  const [questionHistory, setQuestionHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [typing, setTyping] = useState(false);
  const [displayedAnswer, setDisplayedAnswer] = useState('');
  const [theme, setTheme] = useState('dark');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [listening, setListening] = useState(false);
  const [micError, setMicError] = useState(null);
  const recognitionRef = useRef(null);
  const ballRef = useRef(null);
  const inputRef = useRef(null);

  // Sound effects
  const { playShake, playReveal, playClick, playError, toggleSound, enabled: soundEnabledState } = useSoundEffects();

  // --- Handle asking a question (text or voice) ---
  const handleAsk = async (q = question) => {
    if (!q.trim()) {
      setError('Please enter a question.');
      playError();
      hapticFeedback.light();
      return;
    }
    setError(null);
    setLoading(true);
    setIsShaking(true);
    playShake();
    hapticFeedback.medium();
    // Add to history
    const newQuestion = {
      id: Date.now(),
      question: q.trim(),
      timestamp: new Date().toLocaleTimeString()
    };
    setQuestionHistory(prev => [newQuestion, ...prev.slice(0, 9)]); // Keep last 10
    try {
      const reply = await getMistralResponse(q);
      setAnswer(reply);
      setTyping(true);
      setDisplayedAnswer('');
      playReveal();
      hapticFeedback.heavy();
      // Type out the answer
      let index = 0;
      const typeInterval = setInterval(() => {
        if (index < reply.length) {
          setDisplayedAnswer(prev => prev + reply[index]);
          index++;
        } else {
          clearInterval(typeInterval);
          setTyping(false);
          // Read aloud after typing effect
          speak(reply);
        }
      }, 30);
    } catch (err) {
      setError('Failed to fetch answer. Please try again.');
      playError();
      hapticFeedback.light();
    }
    setLoading(false);
    setTimeout(() => setIsShaking(false), 2000);
  };

  // --- Handle Enter key ---
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAsk();
    }
  };

  // --- Ball click: if not loading, start voice input ---
  const handleBallClick = () => {
    if (loading || isShaking || listening) return;
    setMicError(null);
    setListening(true);
    playClick();
    hapticFeedback.medium();
    // Start speech recognition
    recognitionRef.current = startListening({
      onResult: (transcript) => {
        setQuestion(transcript);
        setListening(false);
        handleAsk(transcript);
      },
      onEnd: () => setListening(false),
      onError: (err) => {
        setMicError(typeof err === 'string' ? err : (err.message || 'Mic error'));
        setListening(false);
        playError();
        hapticFeedback.light();
      }
    });
  };

  // --- Stop listening if component unmounts ---
  useEffect(() => {
    return () => stopListening(recognitionRef.current);
  }, []);

  // --- Clear history ---
  const clearHistory = () => {
    setQuestionHistory([]);
    setShowHistory(false);
    playClick();
    hapticFeedback.light();
  };

  // --- Theme toggle ---
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    playClick();
    hapticFeedback.light();
  };

  // --- Sound toggle ---
  const toggleSoundEffects = () => {
    const newState = toggleSound();
    setSoundEnabled(newState);
    hapticFeedback.light();
  };

  // --- Share answer ---
  const shareAnswer = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Magic Ball Answer',
        text: `Question: ${question}\nAnswer: ${answer}`,
      });
    } else {
      navigator.clipboard.writeText(`Question: ${question}\nAnswer: ${answer}`);
      alert('Answer copied to clipboard!');
    }
    playClick();
    hapticFeedback.light();
  };

  // --- Star field generator ---
  useEffect(() => {
    const container = document.querySelector('.star-field-container');
    if (!container) return;
    container.innerHTML = "";
    for (let i = 0; i < 100; i++) {
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
    <div className={`magic-ball-container ${theme}`}>
      {/* Star background */}
      <div className={`star-field-container ${answer ? 'active' : ''}`}></div>

      {/* Header */}
      <div className="header">
        <h1 className="magic-title">🔮 Magic Ball</h1>
        <div className="header-controls">
          <button 
            className="theme-toggle" 
            onClick={toggleTheme}
            title="Toggle theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button 
            className="sound-toggle" 
            onClick={toggleSoundEffects}
            title={`${soundEnabledState ? 'Disable' : 'Enable'} sound effects`}
          >
            {soundEnabledState ? '🔊' : '🔇'}
          </button>
          <button 
            className="history-toggle" 
            onClick={() => {
              setShowHistory(!showHistory);
              playClick();
              hapticFeedback.light();
            }}
            title="Question history"
          >
            📜
          </button>
        </div>
      </div>

      {/* Question History Panel */}
      {showHistory && (
        <div className="history-panel">
          <div className="history-header">
            <h3>Recent Questions</h3>
            <button onClick={clearHistory} className="clear-history">Clear</button>
          </div>
          <div className="history-list">
            {questionHistory.length === 0 ? (
              <p className="no-history">No questions yet. Ask something!</p>
            ) : (
              questionHistory.map((item) => (
                <div key={item.id} className="history-item">
                  <div className="history-question">{item.question}</div>
                  <div className="history-time">{item.timestamp}</div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Main Magic Ball */}
      <div className="magic-ball-section">
        <div 
          ref={ballRef}
          className={`magic-ball ${isShaking ? 'shaking' : ''} ${loading ? 'loading' : ''} ${listening ? 'listening' : ''}`}
          onClick={handleBallClick}
        >
          <div className="ball">
            <div className="ball-inner">
              {listening ? (
                <div className="listening-content">
                  <div className="mic-icon">🎤</div>
                  <div>Listening... Speak your question!</div>
                </div>
              ) : loading ? (
                <div className="loading-content">
                  <div className="loading-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div>Consulting the stars...</div>
                </div>
              ) : (
                <div className="ball-text">
                  <div className="ball-icon">🔮</div>
                  <div>Ask your question<br /><span style={{fontSize:'0.8em',color:'#94a3b8'}}>Click to use mic</span></div>
                </div>
              )}
            </div>
          </div>
        </div>
        {micError && <div className="error-message">{micError}</div>}
        {/* Input Section */}
        <div className="input-section">
          <div className="input-container">
            <input
              ref={inputRef}
              type="text"
              placeholder="Ask your question..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading || listening}
            />
            <button 
              onClick={() => handleAsk()}
              disabled={loading || !question.trim() || listening}
              className="ask-button"
            >
              {loading ? 'Asking...' : 'Ask'}
            </button>
          </div>
          
          {error && <div className="error-message">{error}</div>}
        </div>
      </div>

      {/* Answer Section */}
      {answer && (
        <div className="answer-section">
          <div className="answer-container">
            <div className="answer-header">
              <h3>✨ Your Answer</h3>
              <button onClick={shareAnswer} className="share-button" title="Share answer">
                📤
              </button>
            </div>
            <div className="answer-content">
              <div className="question-display">
                <strong>Q:</strong> {question}
              </div>
              <div className="answer-display">
                <strong>A:</strong> {displayedAnswer}
                {typing && <span className="typing-cursor">|</span>}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="footer">
        <p>Ask the Magic Ball anything and discover your destiny! ✨</p>
      </div>
    </div>
  );
};

export default MagicBall;
