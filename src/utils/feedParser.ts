import { FeedItem } from '../types';
import { XMLParser } from 'fast-xml-parser';

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  parseAttributeValue: true,
  trimValues: true,
  parseTrueNumberOnly: false,
  parseTagValue: false,
  textNodeName: "_",
  isArray: (name) => ['item', 'entry'].indexOf(name) !== -1 // Force array for feed items
});

const generateUniqueId = (item: any, category: string): string => {
  const titlePart = item.title ? `-${item.title.substring(0, 30)}` : '';
  const datePart = item.pubDate || item.published || item.updated || Date.now();
  const linkPart = item.link ? `-${item.link.split('/').pop()}` : '';
  
  const baseId = `${category}${titlePart}${linkPart}-${new Date(datePart).getTime()}`;
  
  return baseId
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

const cleanContent = (content: any): string => {
  if (!content) return '';
  
  const textContent = typeof content === 'string' 
    ? content 
    : content['#text'] || content._ || '';

  return textContent
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
};

export async function parseFeed(url: string, category: string): Promise<FeedItem[]> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const text = await response.text();
    if (!text?.trim()) {
      console.warn(`Empty response from feed: ${url}`);
      return [];
    }

    const result = parser.parse(text);
    
    // Handle different RSS feed structures
    const channel = result.rss?.channel || result.feed || result;
    if (!channel) {
      console.warn(`Invalid feed structure for: ${url}`);
      return [];
    }

    const items = channel.item || channel.entry || [];
    if (!items?.length) {
      console.warn(`No items found in feed: ${url}`);
      return [];
    }

    return items.map((item: any): FeedItem => {
      // Extract content with fallbacks
      const content = item['content:encoded'] || 
                     (typeof item.content === 'string' ? item.content : item.content?._) ||
                     item.description || 
                     item.summary || 
                     '';

      // Handle different title formats
      const title = Array.isArray(item.title) ? item.title[0] : (
        typeof item.title === 'object' ? item.title._ : item.title
      );
      
      // Handle different link formats
      const link = Array.isArray(item.link) 
        ? item.link[0]?.href || item.link[0] 
        : typeof item.link === 'object'
          ? item.link.href || item.link._
          : item.link || '';

      const cleanedContent = cleanContent(content);

      return {
        id: generateUniqueId(item, category),
        title: title || 'Untitled',
        link: link || '',
        content: cleanedContent.substring(0, 300) + (cleanedContent.length > 300 ? '...' : ''),
        pubDate: item.pubDate || item.published || item.updated || new Date().toISOString(),
        category
      };
    });
  } catch (error) {
    console.error(`Error parsing feed: ${url}`, error);
    return [];
  }
}