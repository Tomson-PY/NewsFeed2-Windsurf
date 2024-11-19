import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { FeedManager } from './components/FeedManager';
import { BookmarkView } from './components/BookmarkView';
import { SearchTags } from './components/SearchTags';
import { Settings } from './components/Settings';
import { Header } from './components/Header';
import { SubHeader } from './components/SubHeader';
import { useStore } from './store/useStore';
import { parseFeed } from './utils/feedParser';
import { createProxiedUrl } from './utils/corsProxy';

function App() {
  const [activeView, setActiveView] = useState<'dashboard' | 'feeds' | 'bookmarks' | 'tags' | 'settings'>('dashboard');
  const { feeds, preferences, setFeedItems } = useStore();

  // Apply theme class to document
  useEffect(() => {
    if (preferences.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [preferences.theme]);

  useEffect(() => {
    let isMounted = true;

    const fetchFeeds = async () => {
      try {
        const activeFeedPromises = feeds
          .filter(feed => preferences.selectedFeeds.includes(feed.id))
          .map(async (feed) => {
            try {
              const proxiedUrl = createProxiedUrl(feed.url);
              const items = await parseFeed(proxiedUrl, feed.category);
              return items;
            } catch (error) {
              console.error(`Error fetching feed ${feed.title}:`, error);
              return [];
            }
          });

        const feedResults = await Promise.all(activeFeedPromises);
        
        if (isMounted) {
          const allItems = feedResults.flat().sort((a, b) => 
            new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
          );
          
          setFeedItems(allItems);
        }
      } catch (error) {
        console.error('Error fetching feeds:', error);
      }
    };

    fetchFeeds();
    const interval = setInterval(fetchFeeds, 300000); // Refresh every 5 minutes

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [feeds, preferences.selectedFeeds, setFeedItems]);

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'feeds':
        return <FeedManager />;
      case 'bookmarks':
        return <BookmarkView />;
      case 'tags':
        return <SearchTags />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={`min-h-screen bg-background ${preferences.theme}`}>
      <Header />
      <div className="flex min-h-screen pt-20">
        <Sidebar onViewChange={setActiveView} activeView={activeView} />
        <main className="flex-1 ml-20">
          <SubHeader activeView={activeView} />
          <div className="pt-24 px-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;