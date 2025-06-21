import React, { useEffect, useRef } from 'react';

class SoundManager {
  constructor() {
    this.sounds = {};
    this.enabled = true;
    this.volume = 0.3;
    this.init();
  }

  init() {
    // Create audio contexts for different sounds
    this.createShakeSound();
    this.createRevealSound();
    this.createClickSound();
    this.createErrorSound();
  }

  createShakeSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.5);
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(this.volume, audioContext.currentTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    this.sounds.shake = { audioContext, oscillator, gainNode };
  }

  createRevealSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.3);
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(this.volume, audioContext.currentTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    this.sounds.reveal = { audioContext, oscillator, gainNode };
  }

  createClickSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(this.volume * 0.5, audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    this.sounds.click = { audioContext, oscillator, gainNode };
  }

  createErrorSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(300, audioContext.currentTime + 0.1);
    oscillator.frequency.setValueAtTime(200, audioContext.currentTime + 0.2);
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(this.volume * 0.3, audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    this.sounds.error = { audioContext, oscillator, gainNode };
  }

  playShake() {
    if (!this.enabled) return;
    try {
      const sound = this.sounds.shake;
      if (sound && sound.audioContext.state === 'suspended') {
        sound.audioContext.resume();
      }
      sound.oscillator.start();
      sound.oscillator.stop(sound.audioContext.currentTime + 0.5);
      this.createShakeSound(); // Recreate for next use
    } catch (error) {
      console.log('Sound not supported');
    }
  }

  playReveal() {
    if (!this.enabled) return;
    try {
      const sound = this.sounds.reveal;
      if (sound && sound.audioContext.state === 'suspended') {
        sound.audioContext.resume();
      }
      sound.oscillator.start();
      sound.oscillator.stop(sound.audioContext.currentTime + 0.3);
      this.createRevealSound(); // Recreate for next use
    } catch (error) {
      console.log('Sound not supported');
    }
  }

  playClick() {
    if (!this.enabled) return;
    try {
      const sound = this.sounds.click;
      if (sound && sound.audioContext.state === 'suspended') {
        sound.audioContext.resume();
      }
      sound.oscillator.start();
      sound.oscillator.stop(sound.audioContext.currentTime + 0.1);
      this.createClickSound(); // Recreate for next use
    } catch (error) {
      console.log('Sound not supported');
    }
  }

  playError() {
    if (!this.enabled) return;
    try {
      const sound = this.sounds.error;
      if (sound && sound.audioContext.state === 'suspended') {
        sound.audioContext.resume();
      }
      sound.oscillator.start();
      sound.oscillator.stop(sound.audioContext.currentTime + 0.3);
      this.createErrorSound(); // Recreate for next use
    } catch (error) {
      console.log('Sound not supported');
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
  }
}

// Create a global sound manager instance
const soundManager = new SoundManager();

// Hook for using sound effects
export const useSoundEffects = () => {
  const playShake = () => soundManager.playShake();
  const playReveal = () => soundManager.playReveal();
  const playClick = () => soundManager.playClick();
  const playError = () => soundManager.playError();
  const toggleSound = () => soundManager.toggle();
  const setVolume = (volume) => soundManager.setVolume(volume);

  return {
    playShake,
    playReveal,
    playClick,
    playError,
    toggleSound,
    setVolume,
    enabled: soundManager.enabled
  };
};

// Haptic feedback utility
export const hapticFeedback = {
  light: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
  },
  medium: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(100);
    }
  },
  heavy: () => {
    if ('vibrate' in navigator) {
      navigator.vibrate([100, 50, 100]);
    }
  }
};

export default soundManager; 