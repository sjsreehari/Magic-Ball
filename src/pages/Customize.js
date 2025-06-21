import React from 'react';
import { useApp } from '../context/AppContext';

const themes = [
  { value: 'cosmic', label: 'Cosmic' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
];

const colors = [
  { value: 'purple', label: 'Purple' },
  { value: 'blue', label: 'Blue' },
  { value: 'green', label: 'Green' },
  { value: 'red', label: 'Red' },
];

const patterns = [
  { value: 'cosmic', label: 'Cosmic' },
  { value: 'none', label: 'None' },
];

export default function Customize() {
  const { settings, updateSettings } = useApp();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 pb-24">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 text-center space-y-6">
        <h1 className="text-3xl font-bold text-white bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
          Customize
        </h1>
        <div className="space-y-4">
          <div>
            <label className="block text-white/80 mb-1">Theme</label>
            <select
              value={settings.theme}
              onChange={e => updateSettings({ theme: e.target.value })}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              {themes.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-white/80 mb-1">Ball Color</label>
            <select
              value={settings.ballStyle.color}
              onChange={e => updateSettings({ ballStyle: { ...settings.ballStyle, color: e.target.value } })}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              {colors.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-white/80 mb-1">Pattern</label>
            <select
              value={settings.ballStyle.pattern}
              onChange={e => updateSettings({ ballStyle: { ...settings.ballStyle, pattern: e.target.value } })}
              className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              {patterns.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
            </select>
          </div>
          <div className="flex items-center justify-between mt-4">
            <label className="text-white/80">Glow</label>
            <input
              type="checkbox"
              checked={settings.ballStyle.glow}
              onChange={e => updateSettings({ ballStyle: { ...settings.ballStyle, glow: e.target.checked } })}
              className="form-checkbox h-5 w-5 text-purple-500"
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <label className="text-white/80">Particles</label>
            <input
              type="checkbox"
              checked={settings.ballStyle.particles}
              onChange={e => updateSettings({ ballStyle: { ...settings.ballStyle, particles: e.target.checked } })}
              className="form-checkbox h-5 w-5 text-purple-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 