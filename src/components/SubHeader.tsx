import React from 'react';
import { Home, Rss, Bookmark, Tag, Settings } from 'lucide-react';

interface SubHeaderProps {
  activeView: 'dashboard' | 'feeds' | 'bookmarks' | 'tags' | 'settings';
}

const viewConfigs = {
  dashboard: {
    title: 'Latest Updates',
    subtitle: 'Stay informed with your personalized news feed',
    icon: <Home className="w-6 h-6" />
  },
  feeds: {
    title: 'Manage AI News Feeds',
    subtitle: 'Customize your AI news sources',
    icon: <Rss className="w-6 h-6" />
  },
  bookmarks: {
    title: 'Read Later',
    subtitle: 'Your saved articles for future reading',
    icon: <Bookmark className="w-6 h-6" />
  },
  tags: {
    title: 'Search Tags',
    subtitle: 'Manage your content filters',
    icon: <Tag className="w-6 h-6" />
  },
  settings: {
    title: 'Settings',
    subtitle: 'Customize your experience',
    icon: <Settings className="w-6 h-6" />
  }
};

export const SubHeader: React.FC<SubHeaderProps> = ({ activeView }) => {
  const content = viewConfigs[activeView];

  return (
    <div className="fixed top-16 left-20 right-0 z-10 bg-card border-b border-border shadow-sm">
      <div className="px-8 py-6">
        <div className="flex items-center">
          <div className="p-3 bg-gradient-to-br from-primary/10 to-primary/20 rounded-xl text-primary shadow-sm">
            {content.icon}
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-semibold text-card-foreground mb-1">{content.title}</h2>
            <p className="text-sm text-muted-foreground">{content.subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
};