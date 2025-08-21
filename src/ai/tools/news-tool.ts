'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { gnewsApiKey, newsdataApiKey, thenewsapiToken } from '@/lib/api-keys';


const NewsToolInputSchema = z.object({
    query: z.string().describe("The search query or category for the news, e.g., 'JEE exam', 'UPSC policy', 'Indian literature'."),
    sortBy: z.enum(['latest', 'relevant']).describe('Sorting preference for live news. "latest" for published date, "relevant" for relevancy.'),
    sourceApi: z.enum(['auto', 'gnews', 'newsdata', 'thenewsapi']).optional().default('auto').describe('The specific API to use, or "auto" for fallback.'),
});

const ArticleSchema = z.object({
  headline: z.string(),
  summary: z.string(),
  fullContent: z.string(),
  source: z.string(),
  imageUrl: z.string().optional(),
  url: z.string().url(),
});

const ToolOutputSchema = z.object({
    articles: z.array(ArticleSchema),
    debugUrls: z.array(z.string().url()),
});

const forbiddenKeywords = ['murder', 'rape', 'kidnap', 'assault', 'violence', 'crime', 'death', 'killed', 'shot', 'terrorist', 'attack'];

const filterArticle = (article: any): boolean => {
    const titleLower = article.title?.toLowerCase() || '';
    const descriptionLower = article.description?.toLowerCase() || '';
    const contentLower = article.content?.toLowerCase() || '';
    if (!article.description || !article.title || article.title === '[Removed]') return false;
    return !forbiddenKeywords.some(keyword => titleLower.includes(keyword) || descriptionLower.includes(keyword) || contentLower.includes(keyword));
};

// Helper to get the most complete, clean description available
const getFullContent = (article: any): string => {
    // Prioritize description/snippet over content to avoid API promotional text
    return article.description || article.snippet || article.content || '';
}

// Fetcher for GNews
const fetchFromGNews = async (query: string, sortBy: 'latest' | 'relevant'): Promise<{ articles: any[], url: string }> => {
    if (!gnewsApiKey) throw new Error("GNews API key is missing.");
    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&country=in&max=10&sortby=${sortBy === 'latest' ? 'publishedAt' : 'relevance'}&apikey=${gnewsApiKey}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`GNews API error: ${response.statusText}`);
    const data = await response.json();
    return {
        articles: data.articles.filter(filterArticle).map((article: any) => ({
            headline: article.title,
            summary: article.description,
            fullContent: getFullContent(article),
            source: `GNews / ${article.source.name}`,
            imageUrl: article.image,
            url: article.url,
        })),
        url
    };
};

// Fetcher for NewsData.io
const fetchFromNewsData = async (query: string): Promise<{ articles: any[], url: string }> => {
    if (!newsdataApiKey) throw new Error("NewsData.io API key is missing.");
    const url = `https://newsdata.io/api/1/latest?apikey=${newsdataApiKey}&q=${encodeURIComponent(query)}&language=en&country=in`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`NewsData.io API error: ${response.statusText}`);
    const data = await response.json();
    return {
        articles: data.results.filter(filterArticle).map((article: any) => ({
            headline: article.title,
            summary: article.description,
            fullContent: getFullContent(article),
            source: `NewsData.io / ${article.source_id}`,
            imageUrl: article.image_url,
            url: article.link,
        })),
        url
    };
};

// Fetcher for TheNewsAPI
const fetchFromTheNewsAPI = async (query: string): Promise<{ articles: any[], url: string }> => {
    if (!thenewsapiToken) throw new Error("TheNewsAPI token is missing.");
    const url = `https://api.thenewsapi.com/v1/news/all?api_token=${thenewsapiToken}&search=${encodeURIComponent(query)}&language=en&locale=in&limit=5`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`TheNewsAPI error: ${response.statusText}`);
    const data = await response.json();
    return {
        articles: data.data.filter(filterArticle).map((article: any) => ({
            headline: article.title,
            summary: article.snippet,
            fullContent: getFullContent(article),
            source: `TheNewsAPI / ${article.source}`,
            imageUrl: article.image_url,
            url: article.url,
        })),
        url
    };
};

export const fetchNewsArticles = ai.defineTool(
    {
        name: 'fetchNewsArticles',
        description: 'Fetches live news articles from multiple trusted sources with a fallback mechanism, or from a specific source.',
        input: { schema: NewsToolInputSchema },
        output: { schema: ToolOutputSchema },
    },
    async ({ query, sortBy, sourceApi }) => {
        const debugUrls: string[] = [];

        const services = {
            gnews: () => fetchFromGNews(query, sortBy),
            newsdata: () => fetchFromNewsData(query),
            thenewsapi: () => fetchFromTheNewsAPI(query),
        };

        if (sourceApi && sourceApi !== 'auto') {
            try {
                const { articles, url } = await services[sourceApi]();
                debugUrls.push(url);
                if (articles.length > 0) return { articles: articles.slice(0, 10), debugUrls };
                throw new Error(`No articles from ${sourceApi}`);
            } catch (error) {
                console.error(`${sourceApi} API failed:`, error);
                const articles = [{
                    headline: 'Selected News Source Failed',
                    summary: `Could not fetch news from ${sourceApi} at this moment.`,
                    fullContent: `There was an issue connecting to the selected service. Please try another source or switch to 'Auto' mode. Error: ${(error as Error).message}`,
                    source: 'Study Buddy System',
                    url: '#',
                }];
                return { articles, debugUrls };
            }
        }
        
        // Auto fallback logic
        try {
            const { articles, url } = await fetchFromGNews(query, sortBy);
            debugUrls.push(url);
            if (articles.length > 0) return { articles: articles.slice(0, 10), debugUrls };
            throw new Error("No articles from GNews");
        } catch (error) {
            console.error('GNews API failed:', error);
            try {
                const { articles, url } = await fetchFromNewsData(query);
                debugUrls.push(url);
                if (articles.length > 0) return { articles: articles.slice(0, 10), debugUrls };
                throw new Error("No articles from NewsData.io");
            } catch (error2) {
                console.error('NewsData.io API failed:', error2);
                try {
                    const { articles, url } = await fetchFromTheNewsAPI(query);
                    debugUrls.push(url);
                    if (articles.length > 0) return { articles: articles.slice(0, 10), debugUrls };
                    throw new Error("No articles from TheNewsAPI");
                } catch (error3) {
                     console.error('TheNewsAPI failed:', error3);
                     const articles = [{
                        headline: 'All News Sources Failed',
                        summary: "Could not fetch live news at this moment from any available source.",
                        fullContent: `There was an issue connecting to all news services. Please check your internet connection or try again later. You can also switch to AI-generated news.`,
                        source: 'Study Buddy System',
                        url: '#',
                    }];
                    return { articles, debugUrls };
                }
            }
        }
    }
);
