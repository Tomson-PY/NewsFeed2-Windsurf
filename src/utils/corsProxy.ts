export const createProxiedUrl = (url: string): string => {
  // For Google News, use their RSS feed directly without proxy
  if (url.includes('news.google.com')) {
    return url;
  }

  // Use allorigins with the 'raw' endpoint for RSS feeds
  // The 'get' endpoint sometimes has issues with XML content
  return `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
};