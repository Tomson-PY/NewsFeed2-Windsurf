import React from 'react';
import { Logo } from './Logo';
import { Moon, Sun } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Header: React.FC = () => {
  const { preferences, toggleTheme } = useStore();

  return (
    <header className="fixed top-0 left-0 right-0 z-20 bg-primary text-white h-20 shadow-lg">
      <div className="h-full max-w-7xl mx-auto flex items-center justify-between px-8">
        <div className="flex items-center">
          <div className="bg-gradient-to-br from-white to-purple-100 p-2 rounded-xl shadow-md">
            <Logo className="w-8 h-8 text-purple-900" />
          </div>
          <div className="ml-4 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-white">
              OTTOMATOR Custom AI News Feed
            </h1>
            <p className="text-purple-100 text-sm mt-0.5 font-medium">
              Just the news you are interested in
            </p>
          </div>
        </div>

        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
          title={preferences.theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {preferences.theme === 'light' ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
        </button>
      </div>
    </header>
  );
};