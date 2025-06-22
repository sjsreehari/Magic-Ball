import React, { useState } from 'react';
import { Users, MessageCircle, Send } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function CommunityFeed() {
  const [posts, setPosts] = useState([
    { user: 'Stargazer', message: 'The stars are bright tonight!', time: 'Just now' },
    { user: 'OracleFan', message: 'I got a great fortune today!', time: '2m ago' },
  ]);
  const [input, setInput] = useState('');

  const handlePost = () => {
    if (!input.trim()) return;
    setPosts([{ user: 'You', message: input, time: 'Now' }, ...posts]);
    setInput('');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 pb-24">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 text-center space-y-6">
        <h1 className="text-3xl font-bold text-white bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
          Community Feed
        </h1>
        <div className="flex items-center space-x-2 mb-4 text-white/70">
          <Users size={20} />
          <span>Share your cosmic thoughts!</span>
        </div>
        <div className="flex items-center space-x-2 mb-4">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Share a message..."
            className="flex-1 p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            onClick={handlePost}
            className="p-3 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 text-white hover:from-purple-600 hover:to-cyan-600 transition-all duration-200"
          >
            <Send size={20} />
          </button>
        </div>
        <div className="space-y-2 text-left">
          {posts.length === 0 ? (
            <div className="text-white/70">No posts yet. Be the first to share!</div>
          ) : (
            posts.map((post, idx) => (
              <div key={idx} className="flex items-start space-x-3 bg-white/5 rounded-lg p-3 border border-white/20">
                <MessageCircle size={18} className="mt-1 text-purple-400" />
                <div>
                  <div className="text-white font-semibold">{post.user}</div>
                  <div className="text-white/80">{post.message}</div>
                  <div className="text-xs text-white/50">{post.time}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}