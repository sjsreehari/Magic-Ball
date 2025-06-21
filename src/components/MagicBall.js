import React from 'react';
import magicBallImg from '../assets/magicball.svg';

export default function MagicBall({ isShaking = false, onClick, size = 'large' }) {
  const getSizeClasses = () => {
    switch (size) {
      case 'small': return 'w-24 h-24';
      case 'medium': return 'w-40 h-40';
      case 'large': 
      default: return 'w-72 h-72';
    }
  };

  return (
    <div className="relative flex items-center justify-center">
      <img
        src={magicBallImg}
        alt="Magic Ball"
        className={`
          ${getSizeClasses()} rounded-full object-cover
          transition-all duration-300 cursor-pointer
          ${isShaking ? 'animate-bounce' : ''}
        `}
        onClick={onClick}
        draggable={false}
      />
    </div>
  );
}
