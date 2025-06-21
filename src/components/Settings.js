import React, { useState } from 'react';
import './Settings.css';
import SignUpModal from './SignUpModal';

function Settings({ settings, onChange, onClose }) {
  const [showSignUp, setShowSignUp] = useState(false);

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-modal glass" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Settings">
        <button className="settings-close" onClick={onClose} aria-label="Close settings">✕</button>
        <div className="settings-title">⚙️ Settings</div>
        <div className="settings-list">
          <label className="settings-item">
            <input type="checkbox" checked={settings.sound} onChange={e => onChange('sound', e.target.checked)} /> Sound Effects
          </label>
          <label className="settings-item">
            <input type="checkbox" checked={settings.whisper} onChange={e => onChange('whisper', e.target.checked)} /> Whisper Mode
          </label>
          <label className="settings-item">
            <input type="checkbox" checked={settings.music} onChange={e => onChange('music', e.target.checked)} /> Background Music
          </label>
          <button className="settings-item" style={{marginTop: 12}} onClick={() => setShowSignUp(true)}>
            Sign In / Sign Up
          </button>
        </div>
      </div>
      {showSignUp && <SignUpModal onClose={() => setShowSignUp(false)} />}
    </div>
  );
}

export default Settings;