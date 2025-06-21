import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  ScrollText, 
  Users, 
  Sun, 
  Mic, 
  Calendar, 
  MessageCircle, 
  Activity, 
  Palette, 
  Share2 
} from 'lucide-react';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/history', icon: ScrollText, label: 'History' },
  { path: '/character', icon: Users, label: 'Character' },
  { path: '/fortune', icon: Sun, label: 'Fortune' },
  { path: '/voice', icon: Mic, label: 'Voice' },
  { path: '/planner', icon: Calendar, label: 'Planner' },
  { path: '/community', icon: MessageCircle, label: 'Community' },
  { path: '/pulse', icon: Activity, label: 'Pulse' },
  { path: '/customize', icon: Palette, label: 'Customize' },
  { path: '/share', icon: Share2, label: 'Share' },
];

export default function Navigation() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black/20 backdrop-blur-lg border-t border-white/10 px-4 py-2 z-50">
      <div className="flex justify-around max-w-screen-xl mx-auto">
        {navItems.slice(0, 5).map(({ path, icon: Icon, label }) => (
          <Link
            key={path}
            to={path}
            className={`flex flex-col items-center px-3 py-2 rounded-lg transition-all duration-200 ${
              location.pathname === path
                ? 'text-purple-400 bg-purple-500/20'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <Icon size={20} />
            <span className="text-xs mt-1">{label}</span>
          </Link>
        ))}
      </div>
      {/* Secondary nav for overflow items */}
      <div className="flex justify-center mt-2 space-x-4">
        {navItems.slice(5).map(({ path, icon: Icon, label }) => (
          <Link
            key={path}
            to={path}
            className={`flex items-center px-3 py-1 rounded-full text-sm transition-all duration-200 ${
              location.pathname === path
                ? 'text-purple-400 bg-purple-500/20'
                : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            <Icon size={16} className="mr-1" />
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
} 