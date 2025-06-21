import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

const defaultSettings = {
  theme: 'cosmic',
  soundEnabled: true,
  hapticsEnabled: true,
  selectedPersona: 'Cosmic Oracle',
  ballStyle: {
    color: 'purple',
    pattern: 'cosmic',
    glow: true,
    particles: true,
  },
};

export function AppProvider({ children }) {
  const [questions, setQuestions] = useState([]);
  const [settings, setSettings] = useState(defaultSettings);
  const [onlineUsers, setOnlineUsers] = useState(127);

  useEffect(() => {
    // Load from localStorage
    const savedQuestions = localStorage.getItem('magicBallQuestions');
    const savedSettings = localStorage.getItem('magicBallSettings');
    if (savedQuestions) {
      setQuestions(JSON.parse(savedQuestions));
    }
    if (savedSettings) {
      setSettings({ ...defaultSettings, ...JSON.parse(savedSettings) });
    }
    // Simulate live user count updates
    const interval = setInterval(() => {
      setOnlineUsers(prev => {
        const change = Math.floor(Math.random() * 10) - 5;
        return Math.max(50, Math.min(500, prev + change));
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const addQuestion = (question, answer, persona) => {
    const newQuestion = {
      id: Date.now().toString(),
      question,
      answer,
      timestamp: new Date(),
      persona,
    };
    const updatedQuestions = [newQuestion, ...questions];
    setQuestions(updatedQuestions);
    localStorage.setItem('magicBallQuestions', JSON.stringify(updatedQuestions));
  };

  const updateSettings = (newSettings) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    localStorage.setItem('magicBallSettings', JSON.stringify(updatedSettings));
  };

  return (
    <AppContext.Provider value={{
      questions,
      addQuestion,
      settings,
      updateSettings,
      onlineUsers,
      setOnlineUsers,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
} 