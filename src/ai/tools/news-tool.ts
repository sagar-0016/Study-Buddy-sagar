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

const ToolOutputSchema = z.array(ArticleSchema);

const forbiddenKeywords = ['murder', 'rape', 'kidnap', 'assault', 'violence', 'crime', 'death', 'killed', 'shot', 'terrorist', 'attack'];

const filterArticle = (article: any): boolean => {
    const titleLower = article.title?.toLowerCase() || '';
    const descriptionLower = article.description?.toLowerCase() || '';
    const contentLower = article.content?.toLowerCase() || '';
    if (!article.description || !article.title || article.title === '[Removed]') return false;
    return !forbiddenKeywords.some(keyword => titleLower.includes(keyword) || descriptionLower.includes(keyword) || contentLower.includes(keyword));
};

// Fetcher for GNews
const fetchFromGNews = async (query: string, sortBy: 'latest' | 'relevant'): Promise<any[]> => {
    if (!gnewsApiKey) throw new Error("GNews API key is missing.");
    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&country=in&max=10&sortby=${sortBy === 'latest' ? 'publishedAt' : 'relevance'}&apikey=${gnewsApiKey}`;
    console.log(`[DEBUG] Fetching from GNews: ${url}`); // DEBUG LOG
    const response = await fetch(url);
    if (!response.ok) throw new Error(`GNews API error: ${response.statusText}`);
    const data = await response.json();
    return data.articles.filter(filterArticle).map((article: any) => ({
        headline: article.title,
        summary: article.description,
        fullContent: article.content || article.description,
        source: `GNews / ${article.source.name}`,
        imageUrl: article.image,
        url: article.url,
    }));
};

// Fetcher for NewsData.io
const fetchFromNewsData = async (query: string): Promise<any[]> => {
    if (!newsdataApiKey) throw new Error("NewsData.io API key is missing.");
    const url = `https://newsdata.io/api/1/latest?apikey=${newsdataApiKey}&q=${encodeURIComponent(query)}&language=en&country=in`;
    console.log(`[DEBUG] Fetching from NewsData.io: ${url}`); // DEBUG LOG
    const response = await fetch(url);
    if (!response.ok) throw new Error(`NewsData.io API error: ${response.statusText}`);
    const data = await response.json();
    return data.results.filter(filterArticle).map((article: any) => ({
        headline: article.title,
        summary: article.description,
        fullContent: article.content || article.description,
        source: `NewsData.io / ${article.source_id}`,
        imageUrl: article.image_url,
        url: article.link,
    }));
};

// Fetcher for TheNewsAPI
const fetchFromTheNewsAPI = async (query: string): Promise<any[]> => {
    if (!thenewsapiToken) throw new Error("TheNewsAPI token is missing.");
    const url = `https://api.thenewsapi.com/v1/news/all?api_token=${thenewsapiToken}&search=${encodeURIComponent(query)}&language=en&locale=in&limit=5`;
    console.log(`[DEBUG] Fetching from TheNewsAPI: ${url}`); // DEBUG LOG
    const response = await fetch(url);
    if (!response.ok) throw new Error(`TheNewsAPI error: ${response.statusText}`);
    const data = await response.json();
    return data.data.filter(filterArticle).map((article: any) => ({
        headline: article.title,
        summary: article.snippet,
        fullContent: article.description || article.snippet,
        source: `TheNewsAPI / ${article.source}`,
        imageUrl: article.image_url,
        url: article.url,
    }));
};

export const fetchNewsArticles = ai.defineTool(
    {
        name: 'fetchNewsArticles',
        description: 'Fetches live news articles from multiple trusted sources with a fallback mechanism, or from a specific source.',
        input: { schema: NewsToolInputSchema },
        output: { schema: ToolOutputSchema },
    },
    async ({ query, sortBy, sourceApi }) => {
        const services = {
            gnews: () => fetchFromGNews(query, sortBy),
            newsdata: () => fetchFromNewsData(query),
            thenewsapi: () => fetchFromTheNewsAPI(query),
        };

        if (sourceApi && sourceApi !== 'auto') {
            try {
                console.log(`Attempting to fetch news from specified source: ${sourceApi}`);
                const articles = await services[sourceApi]();
                if (articles.length > 0) return articles.slice(0, 10);
                throw new Error(`No articles from ${sourceApi}`);
            } catch (error) {
                console.error(`${sourceApi} API failed:`, error);
                return [{
                    headline: 'Selected News Source Failed',
                    summary: `Could not fetch news from ${sourceApi} at this moment.`,
                    fullContent: `There was an issue connecting to the selected service. Please try another source or switch to 'Auto' mode. Error: ${(error as Error).message}`,
                    source: 'Study Buddy System',
                    url: '#',
                }];
            }
        }
        
        // Auto fallback logic
        try {
            console.log("Attempting to fetch news from GNews...");
            const articles = await fetchFromGNews(query, sortBy);
            if (articles.length > 0) return articles.slice(0, 10);
            console.log("GNews returned no articles, trying NewsData.io...");
            throw new Error("No articles from GNews");
        } catch (error) {
            console.error('GNews API failed:', error);
            try {
                console.log("Attempting to fetch news from NewsData.io...");
                const articles = await fetchFromNewsData(query);
                if (articles.length > 0) return articles.slice(0, 10);
                console.log("NewsData.io returned no articles, trying TheNewsAPI...");
                throw new Error("No articles from NewsData.io");
            } catch (error2) {
                console.error('NewsData.io API failed:', error2);
                try {
                    console.log("Attempting to fetch news from TheNewsAPI...");
                    const articles = await fetchFromTheNewsAPI(query);
                    if (articles.length > 0) return articles.slice(0, 10);
                    throw new Error("No articles from TheNewsAPI");
                } catch (error3) {
                     console.error('TheNewsAPI failed:', error3);
                     return [{
                        headline: 'All News Sources Failed',
                        summary: "Could not fetch live news at this moment from any available source.",
                        fullContent: `There was an issue connecting to all news services. Please check your internet connection or try again later. You can also switch to AI-generated news.`,
                        source: 'Study Buddy System',
                        url: '#',
                    }];
                }
            }
        }
    }
);
