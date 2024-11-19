import React from 'react';
import { useStore } from '../store/useStore';
import { Bookmark, BookmarkCheck, Circle, CircleDot, Tag } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { feedItems, preferences, toggleBookmark, toggleRead } = useStore();
  
  const filterItemsByTags = (item: any) => {
    if (!preferences?.searchTags || preferences.searchTags.length === 0) {
      return true;
    }
    
    const searchText = `${item.title} ${item.content}`.toLowerCase();
    return preferences.searchTags.some(tag => searchText.includes(tag.toLowerCase()));
  };

  const getMatchingTags = (item: any) => {
    if (!preferences?.searchTags || preferences.searchTags.length === 0) {
      return [];
    }
    
    const searchText = `${item.title} ${item.content}`.toLowerCase();
    return preferences.searchTags.filter(tag => searchText.includes(tag.toLowerCase()));
  };

  const getTimeDifference = (pubDate: string) => {
    const now = new Date();
    const articleDate = new Date(pubDate);
    
    // Reset time part for "FRESH" comparison
    const nowDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const articleDay = new Date(articleDate.getFullYear(), articleDate.getMonth(), articleDate.getDate());
    
    if (nowDate.getTime() === articleDay.getTime()) {
      return <span className="text-emerald-500 font-bold">FRESH</span>;
    }
    
    const diffTime = Math.ceil((nowDate.getTime() - articleDay.getTime()) / (1000 * 60 * 60 * 24));
    return <span className="text-gray-500">{diffTime} {diffTime === 1 ? 'Day' : 'Days'}</span>;
  };

  // Filter and sort items
  const filteredItems = feedItems
    .filter((item) => preferences?.selectedCategories?.includes(item.category))
    .filter(filterItemsByTags);

  // Sort by tag count first, then by date
  const sortedItems = filteredItems.sort((a, b) => {
    const aTagCount = getMatchingTags(a).length;
    const bTagCount = getMatchingTags(b).length;
    
    if (bTagCount !== aTagCount) {
      return bTagCount - aTagCount;
    }
    
    return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
  });

  if (!preferences) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {sortedItems.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-xl shadow-md">
          <Tag className="w-16 h-16 text-muted mx-auto mb-4" />
          <p className="text-lg text-card-foreground">No articles match your selected tags</p>
          <p className="text-muted-foreground mt-2">Try adjusting your search tags in Settings</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedItems.map((item) => (
            <article key={item.id} className="news-card">
              <div className="news-card-header">
                <h2 className="text-xl font-semibold mb-3">
                  <a 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-600 hover:text-blue-800 dark:text-sky-300 dark:hover:text-sky-200"
                  >
                    {item.title}
                  </a>
                </h2>
                <p className="text-card-foreground mb-4">{item.content}</p>
                <div className="flex justify-between items-center text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-muted-foreground">
                        {new Date(item.pubDate).toLocaleDateString()}
                      </span>
                      <span className={`tag-${item.category.replace(/\s+/g, '')}`}>
                        {item.category}
                      </span>
                    </div>
                    <div>{getTimeDifference(item.pubDate)}</div>
                  </div>
                </div>
              </div>
              <div className="news-card-footer">
                <div className="flex-1 flex gap-2">
                  {getMatchingTags(item).map((tag) => (
                    <span key={tag} className="tag-badge tag-badge-default">
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <div className="tooltip-wrapper">
                    <button
                      onClick={() => toggleRead(item.id)}
                      className="action-button"
                      aria-label={preferences.readItems?.includes(item.id) ? "Mark as unread" : "Mark as read"}
                    >
                      {preferences.readItems?.includes(item.id) ? (
                        <Circle className="w-5 h-5 text-primary fill-current" />
                      ) : (
                        <CircleDot className="w-5 h-5 text-muted-foreground" />
                      )}
                      <span className="tooltip">
                        {preferences.readItems?.includes(item.id) ? "Mark as unread" : "Mark as read"}
                      </span>
                    </button>
                  </div>
                  <div className="tooltip-wrapper">
                    <button
                      onClick={() => toggleBookmark(item.id)}
                      className="action-button"
                      aria-label={preferences.bookmarkedItems?.includes(item.id) ? "Remove from Read Later" : "Save for Later"}
                    >
                      {preferences.bookmarkedItems?.includes(item.id) ? (
                        <BookmarkCheck className="w-5 h-5 text-primary fill-current" />
                      ) : (
                        <Bookmark className="w-5 h-5 text-muted-foreground" />
                      )}
                      <span className="tooltip">
                        {preferences.bookmarkedItems?.includes(item.id) ? "Remove from Read Later" : "Save for Later"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};