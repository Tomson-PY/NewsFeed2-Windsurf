import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Feed, FeedItem, UserPreferences, TagPreset } from '../types';

interface StoreState {
  feeds: Feed[];
  feedItems: FeedItem[];
  preferences: UserPreferences;
  addFeed: (feed: Feed) => void;
  removeFeed: (id: string) => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  setFeedItems: (items: FeedItem[]) => void;
  toggleBookmark: (itemId: string) => void;
  toggleRead: (itemId: string) => void;
  addSearchTag: (tag: string) => void;
  removeSearchTag: (tag: string) => void;
  addTagPreset: (name: string, tags: string[]) => void;
  removeTagPreset: (presetId: string) => void;
  applyTagPreset: (presetId: string) => void;
  toggleTheme: () => void;
}

const defaultFeeds: Feed[] = [
  {
    id: 'nasa',
    title: 'NASA Breaking News',
    url: 'https://www.nasa.gov/news-release/feed/',
    category: 'Science',
  },
  {
    id: 'hackernews',
    title: 'Hacker News',
    url: 'https://hnrss.org/frontpage',
    category: 'Technology',
  }
];

const initialPreferences: UserPreferences = {
  selectedCategories: ['Science', 'Technology'],
  selectedFeeds: defaultFeeds.map(feed => feed.id),
  bookmarkedItems: [],
  readItems: [],
  searchTags: [],
  tagPresets: [],
  theme: 'light'
};

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      feeds: defaultFeeds,
      feedItems: [],
      preferences: initialPreferences,
      addFeed: (feed) =>
        set((state) => ({ feeds: [...state.feeds, feed] })),
      removeFeed: (id) =>
        set((state) => ({ feeds: state.feeds.filter((feed) => feed.id !== id) })),
      updatePreferences: (newPreferences) =>
        set((state) => ({
          preferences: { ...state.preferences, ...newPreferences },
        })),
      setFeedItems: (items) =>
        set({ feedItems: items }),
      toggleBookmark: (itemId) =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            bookmarkedItems: state.preferences.bookmarkedItems?.includes(itemId)
              ? state.preferences.bookmarkedItems.filter(id => id !== itemId)
              : [...(state.preferences.bookmarkedItems || []), itemId]
          }
        })),
      toggleRead: (itemId) =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            readItems: state.preferences.readItems?.includes(itemId)
              ? state.preferences.readItems.filter(id => id !== itemId)
              : [...(state.preferences.readItems || []), itemId]
          }
        })),
      addSearchTag: (tag) =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            searchTags: [...new Set([...(state.preferences.searchTags || []), tag])]
          }
        })),
      removeSearchTag: (tag) =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            searchTags: (state.preferences.searchTags || []).filter(t => t !== tag)
          }
        })),
      addTagPreset: (name, tags) =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            tagPresets: [
              ...(state.preferences.tagPresets || []),
              {
                id: `preset-${Date.now()}`,
                name,
                tags
              }
            ]
          }
        })),
      removeTagPreset: (presetId) =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            tagPresets: state.preferences.tagPresets.filter(preset => preset.id !== presetId)
          }
        })),
      applyTagPreset: (presetId) =>
        set((state) => {
          const preset = state.preferences.tagPresets.find(p => p.id === presetId);
          if (!preset) return state;

          return {
            preferences: {
              ...state.preferences,
              searchTags: [...new Set([...state.preferences.searchTags, ...preset.tags])]
            }
          };
        }),
      toggleTheme: () =>
        set((state) => ({
          preferences: {
            ...state.preferences,
            theme: state.preferences.theme === 'light' ? 'dark' : 'light'
          }
        })),
    }),
    {
      name: 'feed-reader-storage',
      partialize: (state) => ({
        preferences: state.preferences,
        feeds: state.feeds,
      }),
    }
  )
);
