import React, { useState, useEffect } from 'react';
import './TarotModal.css';

const tarotDeck = [
  { name: 'The Fool', message: 'A new journey begins. Embrace the unknown.' },
  { name: 'The Magician', message: 'You have the power to manifest your desires.' },
  { name: 'The High Priestess', message: 'Trust your intuition. Secrets will be revealed.' },
  { name: 'The Empress', message: 'Abundance and creativity flow to you.' },
  { name: 'The Emperor', message: 'Take control and lead with wisdom.' },
  { name: 'The Lovers', message: 'A meaningful connection or choice is at hand.' },
  { name: 'The Star', message: 'Hope and inspiration guide you forward.' },
  { name: 'The Moon', message: 'Mystery and dreams surround you.' },
  { name: 'The Sun', message: 'Joy, success, and clarity shine upon you.' },
  { name: 'The World', message: 'Completion and fulfillment are yours.' },
];

function getRandomCard() {
  return tarotDeck[Math.floor(Math.random() * tarotDeck.length)];
}

function TarotModal({ card, onClose }) {
  const [flipped, setFlipped] = useState(false);
  const [currentCard, setCurrentCard] = useState(card || getRandomCard());

  useEffect(() => {
    setTimeout(() => setFlipped(true), 400);
  }, [currentCard]);

  const handleDrawAgain = () => {
    setFlipped(false);
    setTimeout(() => setCurrentCard(getRandomCard()), 400);
  };

  return (
    <div className="tarot-modal-overlay" onClick={onClose}>
      <div className="tarot-modal glass" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Tarot Card">
        <button className="tarot-modal-close" onClick={onClose} aria-label="Close tarot modal">✕</button>
        <div className={`tarot-card-flip${flipped ? ' flipped' : ''}`}> 
          <div className="tarot-card-front">🔮</div>
          <div className="tarot-card-back">
            <div className="tarot-card-title">{currentCard.name}</div>
            <div className="tarot-card-message">{currentCard.message}</div>
            <button className="tarot-draw-again-btn" onClick={handleDrawAgain}>Draw Again</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TarotModal; 