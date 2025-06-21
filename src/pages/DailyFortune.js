import React, { useState } from 'react';
import { Calendar, RefreshCw } from 'lucide-react';
import { useApp } from '../context/AppContext';

const fortunes = [
  "A new opportunity will soon present itself.",
  "Trust your instincts today.",
  "A surprise encounter brings joy.",
  "Patience will be rewarded.",
  "Your creativity is at its peak.",
  "A challenge will reveal your strength.",
  "Good news is on the horizon.",
  "Embrace change with an open heart.",
  "A friend will need your advice.",
  "You are on the right path.",
];

export default function DailyFortune() {
  const { addQuestion, settings } = useApp();
  const [fortune, setFortune] = useState(fortunes[Math.floor(Math.random() * fortunes.length)]);
  const [date] = useState(new Date().toLocaleDateString());

  const handleNewFortune = () => {
    const newFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    setFortune(newFortune);
    addQuestion('Daily Fortune', newFortune, settings.selectedPersona);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 pb-24">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 text-center space-y-6">
        <h1 className="text-3xl font-bold text-white bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
          Daily Fortune
        </h1>
        <div className="flex items-center justify-center space-x-2 text-white/70 mb-4">
          <Calendar size={20} />
          <span>{date}</span>
        </div>
        <div className="text-xl text-white mb-4">{fortune}</div>
        <button
          onClick={handleNewFortune}
          className="w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-cyan-600 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
        >
          <RefreshCw size={18} />
          <span>Get New Fortune</span>
        </button>
      </div>
    </div>
  );
} 