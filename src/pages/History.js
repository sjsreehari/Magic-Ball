import React, { useState } from 'react';
import { Search, Calendar, Download, Copy } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function History() {
  const { questions, user } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [showSignIn, setShowSignIn] = useState(false);

  React.useEffect(() => {
    if (!user) setShowSignIn(true);
  }, [user]);

  const filteredQuestions = questions
    .filter(q => 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      }
      return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
    });

  const exportHistory = () => {
    const data = questions.map(q => ({
      question: q.question,
      answer: q.answer,
      date: new Date(q.timestamp).toLocaleDateString(),
      persona: q.persona,
    }));
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cosmic-oracle-history.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyQuestion = (question, answer) => {
    navigator.clipboard.writeText(`Q: ${question}\nA: ${answer}`);
  };

  if (showSignIn) {
    const SignUpModal = require('../components/SignUpModal').default;
    return <SignUpModal onClose={() => setShowSignIn(false)} />;
  }

  return (
    <div className="min-h-screen p-6 pb-32">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-white bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Wisdom Archive
          </h1>
          <p className="text-white/70">Your journey through cosmic revelations</p>
        </div>
        {/* Search and Controls */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={20} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search your questions and answers..."
                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
            <button
              onClick={exportHistory}
              className="flex items-center space-x-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
            >
              <Download size={16} />
              <span>Export</span>
            </button>
          </div>
        </div>
        {/* Questions List */}
        <div className="space-y-4">
          {filteredQuestions.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                <Calendar className="text-white/50" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No questions yet</h3>
              <p className="text-white/70">
                {searchTerm ? 'No questions match your search.' : 'Start asking the cosmos your deepest questions!'}
              </p>
            </div>
          ) : (
            filteredQuestions.map((q) => (
              <div
                key={q.id}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {q.question}
                      </h3>
                      <p className="text-purple-300 text-sm mb-2">
                        Oracle: {q.persona}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => copyQuestion(q.question, q.answer)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      >
                        <Copy className="text-white/70 hover:text-white" size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4 border-l-4 border-cyan-400">
                    <p className="text-white/90 leading-relaxed">{q.answer}</p>
                  </div>
                  <div className="flex justify-between items-center text-sm text-white/50">
                    <span>{new Date(q.timestamp).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}