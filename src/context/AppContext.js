import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore'; // Removed unused 'arrayUnion'

const AppContext = createContext();

const defaultSettings = {
  theme: 'dark',
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
  const [user, setUser] = useState(null);
  const [firstQuestionAsked, setFirstQuestionAsked] = useState(false);
  const [planner, setPlanner] = useState([]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        // Load user data from Firestore
        const docRef = doc(db, 'users', u.uid);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          const data = snap.data();
          setQuestions(data.questions || []);
          setPlanner(data.planner || []);
        } else {
          await setDoc(docRef, { questions: [], planner: [] });
          setQuestions([]);
          setPlanner([]);
        }
      } else {
        setQuestions([]);
        setPlanner([]);
      }
    });
    // Simulate live user count updates
    const interval = setInterval(() => {
      setOnlineUsers(prev => {
        const change = Math.floor(Math.random() * 10) - 5;
        return Math.max(50, Math.min(500, prev + change));
      });
    }, 3000);
    return () => { unsub(); clearInterval(interval); };
  }, []);

  const addQuestion = async (question, answer, persona) => {
    const newQuestion = {
      id: Date.now().toString(),
      question,
      answer,
      timestamp: new Date(),
      persona,
    };
    const updatedQuestions = [newQuestion, ...questions];
    setQuestions(updatedQuestions);
    setFirstQuestionAsked(true);
    if (user) {
      const docRef = doc(db, 'users', user.uid);
      await updateDoc(docRef, { questions: updatedQuestions });
    } else {
      localStorage.setItem('magicBallQuestions', JSON.stringify(updatedQuestions));
    }
  };

  const updateSettings = (newSettings) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    localStorage.setItem('magicBallSettings', JSON.stringify(updatedSettings));
  };

  const addPlannerItem = async (item) => {
    const updated = [item, ...planner];
    setPlanner(updated);
    if (user) {
      const docRef = doc(db, 'users', user.uid);
      await updateDoc(docRef, { planner: updated });
    }
  };
  const removePlannerItem = async (idx) => {
    const updated = planner.filter((_, i) => i !== idx);
    setPlanner(updated);
    if (user) {
      const docRef = doc(db, 'users', user.uid);
      await updateDoc(docRef, { planner: updated });
    }
  };

  return (
    <AppContext.Provider value={{
      questions,
      addQuestion,
      settings,
      updateSettings,
      onlineUsers,
      setOnlineUsers,
      user,
      firstQuestionAsked,
      setFirstQuestionAsked,
      planner,
      addPlannerItem,
      removePlannerItem,
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