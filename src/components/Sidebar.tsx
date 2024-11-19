import React from 'react';
import { Home, Rss, Bookmark, Tag, Settings } from 'lucide-react';

interface SidebarProps {
  activeView: 'dashboard' | 'feeds' | 'bookmarks' | 'tags' | 'settings';
  onViewChange: (view: 'dashboard' | 'feeds' | 'bookmarks' | 'tags' | 'settings') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-20 bg-gradient-to-b from-purple-900 via-indigo-900 to-purple-900 text-white flex flex-col items-center py-6 shadow-xl">
      <nav className="flex flex-col space-y-6">
        <button 
          onClick={() => onViewChange('dashboard')}
          className={`p-3 rounded-xl transition-all duration-300 ${
            activeView === 'dashboard' 
              ? 'bg-white/20 shadow-lg scale-110' 
              : 'hover:bg-white/10 hover:scale-105'
          }`}
          title="Latest Updates"
        >
          <Home className="w-6 h-6" />
        </button>
        
        <button 
          onClick={() => onViewChange('feeds')}
          className={`p-3 rounded-xl transition-all duration-300 ${
            activeView === 'feeds' 
              ? 'bg-white/20 shadow-lg scale-110' 
              : 'hover:bg-white/10 hover:scale-105'
          }`}
          title="Manage Feeds"
        >
          <Rss className="w-6 h-6" />
        </button>
        
        <button 
          onClick={() => onViewChange('bookmarks')}
          className={`p-3 rounded-xl transition-all duration-300 ${
            activeView === 'bookmarks' 
              ? 'bg-white/20 shadow-lg scale-110' 
              : 'hover:bg-white/10 hover:scale-105'
          }`}
          title="Read Later"
        >
          <Bookmark className="w-6 h-6" />
        </button>
        
        <button 
          onClick={() => onViewChange('tags')}
          className={`p-3 rounded-xl transition-all duration-300 ${
            activeView === 'tags' 
              ? 'bg-white/20 shadow-lg scale-110' 
              : 'hover:bg-white/10 hover:scale-105'
          }`}
          title="Search Tags"
        >
          <Tag className="w-6 h-6" />
        </button>
      </nav>

      <button 
        onClick={() => onViewChange('settings')}
        className={`mt-auto p-3 rounded-xl transition-all duration-300 ${
          activeView === 'settings' 
            ? 'bg-white/20 shadow-lg scale-110' 
            : 'hover:bg-white/10 hover:scale-105'
        }`}
        title="Settings"
      >
        <Settings className="w-6 h-6" />
      </button>
    </aside>
  );
};