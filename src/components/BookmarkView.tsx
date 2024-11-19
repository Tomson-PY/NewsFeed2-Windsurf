import React from 'react';
import { useStore } from '../store/useStore';
import { BookmarkCheck, ExternalLink, Circle, CircleDot } from 'lucide-react';

export const BookmarkView: React.FC = () => {
  const { feedItems, preferences, toggleBookmark, toggleRead } = useStore();
  
  if (!preferences) {
    return <div>Loading...</div>;
  }

  const bookmarkedItems = feedItems.filter((item) => 
    preferences.bookmarkedItems?.includes(item.id)
  );

  return (
    <div>
      {bookmarkedItems.length === 0 ? (
        <div className="text-center py-12 bg-card rounded-xl shadow-md">
          <BookmarkCheck className="w-16 h-16 text-muted mx-auto mb-4" />
          <p className="text-lg text-card-foreground">No bookmarked articles yet</p>
          <p className="text-muted-foreground mt-2">Save interesting articles to read them later</p>
        </div>
      ) : (
        <div className="space-y-6">
          {bookmarkedItems.map((item) => (
            <article key={item.id} className="news-card">
              <div className="news-card-header">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
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
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-muted-foreground">{new Date(item.pubDate).toLocaleDateString()}</span>
                      <span className={`tag-${item.category.replace(/\s+/g, '')}`}>
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
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
                    
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-button text-muted-foreground hover:text-primary"
                      aria-label="Open article"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                    
                    <div className="tooltip-wrapper">
                      <button
                        onClick={() => toggleBookmark(item.id)}
                        className="action-button"
                        aria-label="Remove from Read Later"
                      >
                        <BookmarkCheck className="w-5 h-5 fill-current text-primary" />
                        <span className="tooltip">Remove from Read Later</span>
                      </button>
                    </div>
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