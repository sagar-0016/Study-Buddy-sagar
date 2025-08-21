'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import NewsAPI from 'newsapi';

const newsApi = new NewsAPI(process.env.NEWS_API_KEY || '');

const NewsToolInputSchema = z.object({
    query: z.string().describe("The search query or category for the news, e.g., 'JEE exam', 'UPSC policy', 'Indian literature'."),
});

const ArticleSchema = z.object({
  headline: z.string(),
  summary: z.string(),
  fullContent: z.string(),
  source: z.string(),
  imageUrl: z.string().optional(),
});

export const fetchNewsArticles = ai.defineTool(
    {
        name: 'fetchNewsArticles',
        description: 'Fetches live news articles from a trusted source based on a query. Use this to get up-to-date information on various topics.',
        input: { schema: NewsToolInputSchema },
        output: { schema: z.array(ArticleSchema) },
    },
    async ({ query }) => {
        try {
            console.log(`Fetching news for query: ${query}`);
            const response = await newsApi.v2.everything({
                q: query,
                language: 'en',
                sortBy: 'relevancy',
                pageSize: 10,
                // Exclude sensationalist or inappropriate domains if needed
                excludeDomains: 'tmz.com, dailymail.co.uk'
            });

            if (response.status !== 'ok') {
                // This will be caught by the catch block below
                throw new Error(`News API error: ${response.code}`);
            }
            
            // Filter out articles with sensitive keywords in the title or description
            const forbiddenKeywords = ['murder', 'rape', 'kidnap', 'assault', 'violence', 'crime'];
            const safeArticles = response.articles.filter(article => {
                const titleLower = article.title?.toLowerCase() || '';
                const descriptionLower = article.description?.toLowerCase() || '';
                return !forbiddenKeywords.some(keyword => titleLower.includes(keyword) || descriptionLower.includes(keyword));
            });

            // Map to the schema, ensuring no null/undefined values are passed
            return safeArticles.slice(0, 7).map(article => ({
                headline: article.title || 'No Title',
                summary: article.description || 'No summary available.',
                fullContent: article.content || article.description || 'Full content not available.',
                source: article.source.name || 'Unknown Source',
                imageUrl: article.urlToImage || undefined,
            }));

        } catch (error) {
            console.error('Failed to fetch news from NewsAPI:', error);
            // Return a specific error object that the frontend can check for.
            return [{
                headline: 'Daily Limit Reached',
                summary: "The daily usage limit for fetching live news has likely been exhausted.",
                fullContent: "The app's ability to fetch new articles from live sources is limited to 100 requests per day. This limit has likely been reached. You can switch to AI-generated news or try again tomorrow.",
                source: 'Study Buddy System',
                imageUrl: undefined,
            }];
        }
    }
);
