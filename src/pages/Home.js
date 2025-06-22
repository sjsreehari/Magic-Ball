import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { History, Settings, Share2, Volume2, VolumeX, Smartphone, SmartphoneNfc } from 'lucide-react';
import MagicBall from '../components/MagicBall';
import { useApp } from '../context/AppContext';
import { getMistralResponse } from '../api';
import SettingsModal from '../components/Settings';

export default function Home() {
  const { addQuestion, settings, updateSettings, onlineUsers } = useApp();
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleAskQuestion = async () => {
    if (!question.trim()) return;
    setIsShaking(true);
    setShowAnswer(false);
    setAnswer('');
    // Play shake sound (if implemented)
    // Haptic feedback (if implemented)
    setTimeout(async () => {
      setIsShaking(false);
      setIsTyping(true);
      // Use Mistral API for answer
      let apiAnswer = '';
      try {
        apiAnswer = await getMistralResponse(question);
      } catch (e) {
        apiAnswer = 'The cosmos is silent. Please try again.';
      }
      // Typing animation
      let currentText = '';
      let currentIndex = 0;
      const typeInterval = setInterval(() => {
        if (currentIndex < apiAnswer.length) {
          currentText += apiAnswer[currentIndex];
          setAnswer(currentText);
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          setIsTyping(false);
          setShowAnswer(true);
          addQuestion(question, apiAnswer, settings.selectedPersona);
        }
      }, 50);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAskQuestion();
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Cosmic Magic Ball Prediction',
        text: `Question: ${question}\n\nAnswer: ${answer}`,
        url: window.location.href,
      });
    } else {
      setShowShare(true);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`Question: ${question}\n\nAnswer: ${answer}`);
    setShowShare(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-2 sm:px-4 pb-20 sm:pb-24 relative w-full">
      {/* Header */}
      <div className="absolute top-4 sm:top-8 left-0 right-0 flex justify-between items-center px-2 sm:px-6 w-full max-w-md mx-auto">
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button
            onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
            className="p-2 sm:p-2.5 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
          >
            {settings.soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
          <button
            onClick={() => updateSettings({ hapticsEnabled: !settings.hapticsEnabled })}
            className="p-2 sm:p-2.5 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
          >
            {settings.hapticsEnabled ? <Smartphone size={20} /> : <SmartphoneNfc size={20} />}
          </button>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Link
            to="/history"
            className="p-2 sm:p-2.5 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
          >
            <History size={20} />
          </Link>
          <button
            onClick={() => setShowSettings(true)}
            className="p-2 sm:p-2.5 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
            aria-label="Open settings"
          >
            <Settings size={20} />
          </button>
        </div>
      </div>
      {showSettings && (
        <SettingsModal
          settings={settings}
          onChange={(key, value) => updateSettings({ [key]: value })}
          onClose={() => setShowSettings(false)}
        />
      )}
      {/* Main content */}
      <div className="text-center max-w-md w-full space-y-6 sm:space-y-8 pt-20 sm:pt-28 mx-auto">
        {/* Title */}
        <div className="space-y-1 sm:space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold text-white bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Cosmic Oracle
          </h1>
          <p className="text-white/70 text-sm sm:text-base">Ask the universe your deepest questions</p>
        </div>
        {/* Magic Ball */}
        <div className="flex justify-center w-full">
          <MagicBall isShaking={isShaking} onClick={handleAskQuestion} />
        </div>
        {/* Question Input */}
        <div className="space-y-3 sm:space-y-4">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="What mysteries shall the cosmos reveal to you?"
            className="w-full p-3 sm:p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-base sm:text-lg"
            rows={3}
          />
          <button
            onClick={handleAskQuestion}
            disabled={!question.trim() || isShaking || isTyping}
            className="w-full py-2 sm:py-3 px-4 sm:px-6 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 text-base sm:text-lg"
          >
            {isShaking ? 'Consulting the cosmos...' : isTyping ? 'Channeling wisdom...' : 'Ask the Oracle'}
          </button>
        </div>
        {/* Answer */}
        {(answer || isTyping) && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
            <h3 className="text-base sm:text-lg font-semibold text-purple-300 mb-2 sm:mb-3">
              The Oracle Speaks:
            </h3>
            <p className="text-white text-base sm:text-lg leading-relaxed">
              {answer}
              {isTyping && <span className="animate-pulse">|</span>}
            </p>
            {showAnswer && (
              <button
                onClick={handleShare}
                className="mt-3 sm:mt-4 flex items-center justify-center space-x-2 w-full py-2 px-4 bg-white/10 hover:bg-white/20 rounded-lg text-white/80 hover:text-white transition-colors text-base"
              >
                <Share2 size={16} />
                <span>Share This Wisdom</span>
              </button>
            )}
          </div>
        )}
        {/* Live Magic Pulse */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 border border-white/20">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-white/80 text-xs sm:text-sm">
              🔁 {onlineUsers} others are connecting to the cosmos now...
            </span>
          </div>
        </div>
      </div>
      {/* Share Modal */}
      {showShare && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6 max-w-xs sm:max-w-sm w-full border border-white/20">
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Share Your Wisdom</h3>
            <div className="space-y-2 sm:space-y-3">
              <button
                onClick={copyToClipboard}
                className="w-full py-2 px-4 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors text-base"
              >
                Copy to Clipboard
              </button>
              <button
                onClick={() => setShowShare(false)}
                className="w-full py-2 px-4 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-base"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}