import React, { useState } from 'react';
import './Settings.css';
import SignUpModal from './SignUpModal';

function SettingsModal({ settings, onChange, onClose }) {
  const [showSignUp, setShowSignUp] = useState(false);

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
          <button className="settings-item" style={{marginTop: 12}} onClick={() => setShowSignUp(true)}>
            Sign In / Sign Up
          </button>
        </div>
      </div>
      {showSignUp && <SignUpModal onClose={() => setShowSignUp(false)} />}
    </div>
  );
}

export default SettingsModal;