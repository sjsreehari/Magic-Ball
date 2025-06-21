import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function LivePulse() {
  const { onlineUsers } = useApp();
  const [pulse, setPulse] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse(p => [Math.floor(Math.random() * 100) + 100, ...p.slice(0, 19)]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 pb-24">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 text-center space-y-6">
        <h1 className="text-3xl font-bold text-white bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
          Live Magic Pulse
        </h1>
        <div className="flex items-center justify-center space-x-2 text-white/70 mb-4">
          <Activity size={20} />
          <span>{onlineUsers} users connected</span>
        </div>
        <div className="flex items-end justify-center h-32 space-x-1 mb-4">
          {pulse.map((val, idx) => (
            <div key={idx} style={{ height: `${val / 3}px` }} className="w-2 bg-cyan-400 rounded-t"></div>
          ))}
        </div>
        <div className="text-white/70 text-sm">The cosmic energy is always flowing!</div>
      </div>
    </div>
  );
} 