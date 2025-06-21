import React, { useState } from 'react';
import { Users, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

const personas = [
  {
    name: 'Cosmic Oracle',
    description: 'Wise, mystical, and cryptic. Speaks in riddles and cosmic metaphors.',
    icon: <Sparkles size={32} />,
  },
  {
    name: 'Playful Sprite',
    description: 'Cheerful, playful, and lighthearted. Gives fun, quirky answers.',
    icon: <Users size={32} />,
  },
  {
    name: 'Stoic Sage',
    description: 'Serious, philosophical, and direct. Offers deep, thoughtful wisdom.',
    icon: <Users size={32} />,
  },
];

export default function CharacterMode() {
  const { settings, updateSettings } = useApp();
  const [index, setIndex] = useState(personas.findIndex(p => p.name === settings.selectedPersona) || 0);

  const handlePrev = () => setIndex((prev) => (prev - 1 + personas.length) % personas.length);
  const handleNext = () => setIndex((prev) => (prev + 1) % personas.length);
  const handleSelect = () => updateSettings({ selectedPersona: personas[index].name });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 pb-24">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 text-center space-y-6">
        <h1 className="text-3xl font-bold text-white bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
          Choose Your Oracle
        </h1>
        <div className="flex items-center justify-center space-x-4">
          <button onClick={handlePrev} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
            <ChevronLeft size={24} />
          </button>
          <div className="flex flex-col items-center">
            {personas[index].icon}
            <div className="text-xl font-semibold text-white mt-2">{personas[index].name}</div>
            <div className="text-white/70 text-sm mt-1">{personas[index].description}</div>
          </div>
          <button onClick={handleNext} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
            <ChevronRight size={24} />
          </button>
        </div>
        <button
          onClick={handleSelect}
          className="mt-6 w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-cyan-600 transition-all duration-200 transform hover:scale-105"
        >
          Select This Oracle
        </button>
      </div>
    </div>
  );
} 