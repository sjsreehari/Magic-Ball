import React, { useState } from 'react';
import { Calendar, Plus, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function MysticPlanner() {
  const { settings } = useApp();
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');

  const addItem = () => {
    if (!input.trim()) return;
    setItems([{ text: input, date: new Date().toLocaleString() }, ...items]);
    setInput('');
  };

  const removeItem = (idx) => {
    setItems(items.filter((_, i) => i !== idx));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 pb-24">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 text-center space-y-6">
        <h1 className="text-3xl font-bold text-white bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
          Mystic Planner
        </h1>
        <div className="flex items-center space-x-2 mb-4">
          <Calendar size={20} />
          <span className="text-white/70">{new Date().toLocaleDateString()}</span>
        </div>
        <div className="flex items-center space-x-2 mb-4">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Add a mystical task..."
            className="flex-1 p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            onClick={addItem}
            className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 text-white hover:from-purple-600 hover:to-cyan-600 transition-all duration-200"
          >
            <Plus size={20} />
          </button>
        </div>
        <div className="space-y-2">
          {items.length === 0 ? (
            <div className="text-white/70">No tasks yet. Add your first mystical task!</div>
          ) : (
            items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between bg-white/5 rounded-lg p-3 border border-white/20">
                <div className="text-white text-left">
                  <div>{item.text}</div>
                  <div className="text-xs text-white/50">{item.date}</div>
                </div>
                <button onClick={() => removeItem(idx)} className="p-2 rounded-full hover:bg-white/10 text-white">
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 