'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import NewsAPI from 'newsapi';
import type { TopHeadlinesRequest } from 'newsapi';

// This will be populated from your .env file
const newsApiKey = process.env.NEWS_API_KEY || '';

// Initialize the NewsAPI client if the key is available
const newsApi = newsApiKey ? new NewsAPI(newsApiKey) : null;

// Define a type for our debug information
const NewsDebugInfoSchema = z.object({
    requestUrl: z.string(),
    params: z.custom<TopHeadlinesRequest>(),
});
export type NewsDebugInfo = z.infer<typeof NewsDebugInfoSchema>;

const NewsToolInputSchema = z.object({
    query: z.string().describe("The search query or category for the news, e.g., 'JEE exam', 'UPSC policy', 'Indian literature'."),
    sortBy: z.enum(['latest', 'relevant']).describe('Sorting preference for live news. "latest" for published date, "relevant" for relevancy.'),
});

const ArticleSchema = z.object({
  headline: z.string(),
  summary: z.string(),
  fullContent: z.string(),
  source: z.string(),
  imageUrl: z.string().optional(),
});

const ToolOutputSchema = z.object({
    articles: z.array(ArticleSchema),
    debugInfo: NewsDebugInfoSchema,
});

export const fetchNewsArticles = ai.defineTool(
    {
        name: 'fetchNewsArticles',
        description: 'Fetches live news articles from a trusted source based on a query. Use this to get up-to-date information on various topics.',
        input: { schema: NewsToolInputSchema },
        output: { schema: ToolOutputSchema },
    },
    async ({ query, sortBy }) => {
        const requestParams: TopHeadlinesRequest = {
            q: ['General', 'Science', 'Literature'].includes(query) ? undefined : query,
            category: ['General', 'Science', 'Literature'].includes(query) ? query.toLowerCase() as any : undefined,
            language: 'en',
            country: 'in', // Focus on India
            sortBy: sortBy === 'latest' ? 'publishedAt' : 'relevancy',
            pageSize: 20,
        };

        // Reconstruct the URL for debugging
        const baseUrl = 'https://newsapi.org/v2/top-headlines';
        const params = new URLSearchParams();
        if (requestParams.q) params.append('q', requestParams.q);
        if (requestParams.category) params.append('category', requestParams.category);
        if (requestParams.language) params.append('language', requestParams.language);
        if (requestParams.country) params.append('country', requestParams.country);
        if (requestParams.sortBy) params.append('sortBy', requestParams.sortBy);
        if (requestParams.pageSize) params.append('pageSize', String(requestParams.pageSize));
        params.append('apiKey', newsApiKey); // Add the API key
        const requestUrl = `${baseUrl}?${params.toString()}`;

        const debugInfo = { requestUrl, params: requestParams };
        
        if (!newsApi) {
            console.error('NewsAPI key is missing.');
            return {
                debugInfo,
                articles: [{
                    headline: 'API Key Missing',
                    summary: "The NewsAPI key is not configured in the environment variables.",
                    fullContent: "To fetch live news, please add your NewsAPI key to the .env file in the root of your project. You can get a free key from newsapi.org. For now, please use the AI-generated news mode.",
                    source: 'Study Buddy System',
                }]
            };
        }

        try {
            const response = await newsApi.v2.topHeadlines(requestParams);
            
            if (response.status !== 'ok') {
                if ((response as any).code === 'rateLimited') {
                     return {
                        debugInfo,
                        articles: [{
                            headline: 'Daily Limit Reached',
                            summary: "The daily usage limit for fetching live news has been exhausted.",
                            fullContent: "The app's ability to fetch new articles from live sources is limited. This limit has likely been reached. Please switch to AI-generated news or try again tomorrow.",
                            source: 'Study Buddy System',
                        }]
                    };
                }
                throw new Error(`News API error: ${(response as any).message || (response as any).code}`);
            }
            
            const forbiddenKeywords = ['murder', 'rape', 'kidnap', 'assault', 'violence', 'crime', 'death', 'killed', 'shot', 'terrorist'];
            const safeArticles = response.articles.filter(article => {
                const titleLower = article.title?.toLowerCase() || '';
                const descriptionLower = article.description?.toLowerCase() || '';
                if (!article.description || !article.title || article.title === '[Removed]') return false;
                return !forbiddenKeywords.some(keyword => titleLower.includes(keyword) || descriptionLower.includes(keyword));
            });

            return {
                debugInfo,
                articles: safeArticles.slice(0, 10).map(article => ({
                    headline: article.title || 'No Title',
                    summary: article.description || 'No summary available.',
                    fullContent: article.content || article.description || 'Full content not available.',
                    source: article.source.name || 'Unknown Source',
                    imageUrl: article.urlToImage || undefined,
                }))
            };

        } catch (error: any) {
            console.error('Failed to fetch news from NewsAPI:', error);
            if (error.code === 'rateLimited' || (error.message && error.message.includes('rateLimited'))) {
                 return {
                    debugInfo,
                    articles: [{
                        headline: 'Daily Limit Reached',
                        summary: "The daily usage limit for fetching live news has been exhausted.",
                        fullContent: "The app's ability to fetch new articles from live sources is limited. This limit has likely been reached. Please switch to AI-generated news or try again tomorrow.",
                        source: 'Study Buddy System',
                    }]
                };
            }
            return {
                debugInfo,
                articles: [{
                    headline: 'Error Fetching News',
                    summary: "Could not fetch live news at this moment.",
                    fullContent: `There was an issue connecting to the news service. Please check your internet connection or try again later. You can also switch to AI-generated news. Error details: ${error.message}`,
                    source: 'Study Buddy System',
                }]
            };
        }
    }
);
