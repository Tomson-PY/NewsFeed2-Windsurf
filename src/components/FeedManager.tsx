import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Globe, Trash2, Bot, Brain, Image, Code, Newspaper } from 'lucide-react';

export const FeedManager: React.FC = () => {
  const { feeds, preferences, updatePreferences, removeFeed } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = Array.from(new Set(feeds.map((feed) => feed.category)));

  const filteredFeeds = selectedCategory === 'all'
    ? feeds
    : feeds.filter((feed) => feed.category === selectedCategory);

  const handleFeedToggle = (feedId: string) => {
    const newSelectedFeeds = preferences.selectedFeeds.includes(feedId)
      ? preferences.selectedFeeds.filter((id) => id !== feedId)
      : [...preferences.selectedFeeds, feedId];
    
    updatePreferences({ selectedFeeds: newSelectedFeeds });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'AI News':
        return <Newspaper className="w-6 h-6 text-primary" />;
      case 'AI General':
        return <Bot className="w-6 h-6 text-primary" />;
      case 'LLMs':
        return <Brain className="w-6 h-6 text-primary" />;
      case 'AI Image Generation':
        return <Image className="w-6 h-6 text-primary" />;
      case 'AI Programming':
        return <Code className="w-6 h-6 text-primary" />;
      default:
        return <Globe className="w-6 h-6 text-primary" />;
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <label className="text-sm font-medium text-card-foreground">Filter by Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="mt-1 block w-64 rounded-lg border-input bg-card text-card-foreground shadow-sm focus:border-primary focus:ring-primary"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="space-y-4">
          {filteredFeeds.map((feed) => (
            <div key={feed.id} className="flex items-center justify-between bg-card p-4 rounded-lg shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center space-x-4">
                {getCategoryIcon(feed.category)}
                <div>
                  <h3 className="font-medium text-card-foreground">{feed.title}</h3>
                  <span className={`inline-block mt-1 px-3 py-0.5 rounded-full text-sm font-medium tag-${feed.category.replace(/\s+/g, '')}`}>
                    {feed.category}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={preferences.selectedFeeds.includes(feed.id)}
                    onChange={() => handleFeedToggle(feed.id)}
                    className="rounded text-primary focus:ring-primary border-input"
                  />
                  <span className="text-sm text-card-foreground">Active</span>
                </label>
                
                <button
                  onClick={() => removeFeed(feed.id)}
                  className="p-2 text-muted-foreground hover:text-destructive rounded-full hover:bg-muted/50"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};