import React, { useState } from 'react';
import { Mic, MicOff, Send } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getMistralResponse } from '../api';

export default function VoiceOracle() {
  const { addQuestion, settings } = useApp();
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const handleListen = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      setQuestion(event.results[0][0].transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const handleAsk = async () => {
    if (!question.trim()) return;
    setIsTyping(true);
    let apiAnswer = '';
    try {
      apiAnswer = await getMistralResponse(question);
    } catch (e) {
      apiAnswer = 'The cosmos is silent. Please try again.';
    }
    setAnswer(apiAnswer);
    setIsTyping(false);
    addQuestion(question, apiAnswer, settings.selectedPersona);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 pb-24">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 text-center space-y-6">
        <h1 className="text-3xl font-bold text-white bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
          Voice Oracle
        </h1>
        <div className="flex flex-col items-center space-y-4">
          <button
            onClick={handleListen}
            className={`p-4 rounded-full ${isListening ? 'bg-purple-500' : 'bg-white/10'} text-white hover:bg-purple-600 transition-colors`}
            disabled={isListening}
          >
            {isListening ? <MicOff size={32} /> : <Mic size={32} />}
          </button>
          <input
            type="text"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            placeholder="Speak or type your question..."
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
            disabled={isListening}
          />
          <button
            onClick={handleAsk}
            className="w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-cyan-600 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
            disabled={isTyping || isListening || !question.trim()}
          >
            <Send size={18} />
            <span>{isTyping ? 'Channeling wisdom...' : 'Ask the Oracle'}</span>
          </button>
        </div>
        {answer && (
          <div className="mt-6 bg-white/10 rounded-xl p-4 border border-white/20 text-white">
            <div className="font-semibold mb-2">The Oracle Speaks:</div>
            <div>{answer}</div>
          </div>
        )}
      </div>
    </div>
  );
} 