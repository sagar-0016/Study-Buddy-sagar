
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import NewsAPI from 'newsapi';

// This will be populated from your .env file
const newsApiKey = process.env.NEWS_API_KEY || '';

// Initialize the NewsAPI client if the key is available
const newsApi = newsApiKey ? new NewsAPI(newsApiKey) : null;

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

export const fetchNewsArticles = ai.defineTool(
    {
        name: 'fetchNewsArticles',
        description: 'Fetches live news articles from a trusted source based on a query. Use this to get up-to-date information on various topics.',
        input: { schema: NewsToolInputSchema },
        output: { schema: z.array(ArticleSchema) },
    },
    async ({ query, sortBy }) => {
        if (!newsApi) {
            console.error('NewsAPI key is missing. Returning an error message.');
            return [{
                headline: 'API Key Missing',
                summary: "The NewsAPI key is not configured in the environment variables.",
                fullContent: "To fetch live news, please add your NewsAPI key to the .env file in the root of your project. You can get a free key from newsapi.org. For now, please use the AI-generated news mode.",
                source: 'Study Buddy System',
            }];
        }

        try {
            console.log(`Fetching live news for query: "${query}" with sortBy: "${sortBy}"`);
            
            const response = await newsApi.v2.topHeadlines({
                q: ['General', 'Science', 'Literature'].includes(query) ? '' : query,
                category: ['General', 'Science', 'Literature'].includes(query) ? query.toLowerCase() : undefined,
                language: 'en',
                country: 'in', // Focus on India
                sortBy: sortBy === 'latest' ? 'publishedAt' : 'relevancy',
                pageSize: 20,
            });
            
            // Log the raw response to the server terminal for debugging
            console.log('--- RAW NEWSAPI RESPONSE ---');
            console.log(JSON.stringify(response, null, 2));
            console.log('--------------------------');


            if (response.status !== 'ok') {
                if ((response as any).code === 'rateLimited') {
                     return [{
                        headline: 'Daily Limit Reached',
                        summary: "The daily usage limit for fetching live news has been exhausted.",
                        fullContent: "The app's ability to fetch new articles from live sources is limited. This limit has likely been reached. Please switch to AI-generated news or try again tomorrow.",
                        source: 'Study Buddy System',
                    }];
                }
                throw new Error(`News API error: ${(response as any).message || (response as any).code}`);
            }
            
            // Filter out articles with sensitive keywords in the title or description
            const forbiddenKeywords = ['murder', 'rape', 'kidnap', 'assault', 'violence', 'crime', 'death', 'killed', 'shot', 'terrorist'];
            const safeArticles = response.articles.filter(article => {
                const titleLower = article.title?.toLowerCase() || '';
                const descriptionLower = article.description?.toLowerCase() || '';
                // Also filter out articles with no description or content, as they are not useful
                if (!article.description || !article.title || article.title === '[Removed]') return false;
                return !forbiddenKeywords.some(keyword => titleLower.includes(keyword) || descriptionLower.includes(keyword));
            });

            // Map to the schema, ensuring no null/undefined values are passed
            return safeArticles.slice(0, 10).map(article => ({
                headline: article.title || 'No Title',
                summary: article.description || 'No summary available.',
                fullContent: article.content || article.description || 'Full content not available.',
                source: article.source.name || 'Unknown Source',
                imageUrl: article.urlToImage || undefined,
            }));

        } catch (error: any) {
            console.error('Failed to fetch news from NewsAPI:', error);
            // Handle specific error codes if available from the newsapi client
            if (error.code === 'rateLimited' || (error.message && error.message.includes('rateLimited'))) {
                 return [{
                    headline: 'Daily Limit Reached',
                    summary: "The daily usage limit for fetching live news has been exhausted.",
                    fullContent: "The app's ability to fetch new articles from live sources is limited. This limit has likely been reached. Please switch to AI-generated news or try again tomorrow.",
                    source: 'Study Buddy System',
                }];
            }
            return [{
                headline: 'Error Fetching News',
                summary: "Could not fetch live news at this moment.",
                fullContent: `There was an issue connecting to the news service. Please check your internet connection or try again later. You can also switch to AI-generated news. Error details: ${error.message}`,
                source: 'Study Buddy System',
            }];
        }
    }
);
