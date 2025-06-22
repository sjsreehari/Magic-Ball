import React from 'react';
import './Settings.css';
import { Link } from 'react-router-dom';

function SettingsModal({ settings, onChange, onClose }) {
  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-modal glass" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Settings">
        <button className="settings-close" onClick={onClose} aria-label="Close settings">✕</button>
        <div className="settings-title">⚙️ Settings</div>
        <div className="settings-list">
          <label className="settings-item">
            <input type="checkbox" checked={settings.soundEnabled} onChange={e => onChange('soundEnabled', e.target.checked)} /> Sound Effects
          </label>
          <label className="settings-item">
            <input type="checkbox" checked={settings.hapticsEnabled} onChange={e => onChange('hapticsEnabled', e.target.checked)} /> Haptic Feedback
          </label>
          <hr className="my-3" />
          <Link to="/history" className="settings-item">History</Link>
          <Link to="/planner" className="settings-item">Planner</Link>
          <Link to="/community" className="settings-item">Community</Link>
          <Link to="/customize" className="settings-item">Customize</Link>
          <Link to="/share" className="settings-item">Share Reels</Link>
        </div>
      </div>
    </div>
  );
}

export default SettingsModal;