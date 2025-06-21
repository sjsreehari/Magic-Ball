import React, { useState } from 'react';
import { Share2, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ShareReels() {
  const { settings } = useApp();
  const [reels, setReels] = useState([
    { text: 'The stars align for you!', date: 'Today' },
    { text: 'Trust your intuition.', date: 'Yesterday' },
  ]);
  const [input, setInput] = useState('');

  const addReel = () => {
    if (!input.trim()) return;
    setReels([{ text: input, date: 'Now' }, ...reels]);
    setInput('');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 pb-24">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 text-center space-y-6">
        <h1 className="text-3xl font-bold text-white bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
          Share Reels
        </h1>
        <div className="flex items-center space-x-2 mb-4 text-white/70">
          <Share2 size={20} />
          <span>Share your mystical moments!</span>
        </div>
        <div className="flex items-center space-x-2 mb-4">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Share a reel..."
            className="flex-1 p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            onClick={addReel}
            className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 text-white hover:from-purple-600 hover:to-cyan-600 transition-all duration-200"
          >
            <Plus size={20} />
          </button>
        </div>
        <div className="space-y-2 text-left">
          {reels.length === 0 ? (
            <div className="text-white/70">No reels yet. Be the first to share!</div>
          ) : (
            reels.map((reel, idx) => (
              <div key={idx} className="flex items-start space-x-3 bg-white/5 rounded-lg p-3 border border-white/20">
                <div>
                  <div className="text-white/80">{reel.text}</div>
                  <div className="text-xs text-white/50">{reel.date}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 