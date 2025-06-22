import React from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import { useApp } from '../context/AppContext';
import SignUpPage from './SignUpPage';

export default function Layout({ children }) {
  const { user, settings } = useApp();
  const location = useLocation();

  if (!user) {
    return <SignUpPage />;
  }

  const getThemeClasses = () => {
    switch (settings.theme) {
      case 'light':
        return 'bg-gradient-to-br from-blue-50 to-purple-100';
      case 'dark':
        return 'bg-gradient-to-br from-gray-900 to-black';
      case 'cosmic':
      default:
        return 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900';
    }
  };

  return (
    <div className={`min-h-screen ${getThemeClasses()} relative overflow-hidden`}>
      {/* Cosmic background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating particles */}
      {settings.ballStyle.particles && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${10 + Math.random() * 20}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 flex flex-col min-h-screen">
        <main className="flex-1">
          {children}
        </main>
        {/* Only show navigation on non-home pages */}
        {location.pathname !== '/' && user && <Navigation />}
      </div>
    </div>
  );
}