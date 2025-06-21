import React from 'react';
import './Gallery.css';

function Gallery({ fortunes, onDelete, onClose }) {
  return (
    <div className="gallery-overlay" onClick={onClose}>
      <div className="gallery-modal glass" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Fortune Gallery">
        <button className="gallery-close" onClick={onClose} aria-label="Close gallery">✕</button>
        <div className="gallery-title">🌟 Fortune Gallery</div>
        <div className="gallery-grid">
          {fortunes.length === 0 && <div style={{color:'#8b5cf6',fontStyle:'italic',textAlign:'center'}}>No fortunes saved yet.</div>}
          {fortunes.map(f => (
            <div key={f.id} className="gallery-scroll">
              <div className="gallery-scroll-text">{f.text}</div>
              <div className="gallery-scroll-date">{f.date}</div>
              <button className="gallery-delete-btn" aria-label="Delete fortune" onClick={() => onDelete(f.id)}>🗑️</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gallery; 