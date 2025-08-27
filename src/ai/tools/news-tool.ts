
'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { gnewsApiKey, newsdataApiKey } from '@/lib/api-keys';
import { fetchFullArticleContent } from './article-parser-tool';

const NewsToolInputSchema = z.object({
    query: z.string().describe("The search query or category for the news, e.g., 'JEE exam', 'UPSC policy', 'Indian literature'."),
    isGeneral: z.boolean().optional().describe("A flag to indicate if the query is for the 'General' category to apply stricter filtering."),
    sortBy: z.enum(['latest', 'relevant']).describe('Sorting preference for live news. "latest" for published date, "relevant" for relevancy.'),
    sourceApi: z.enum(['auto', 'gnews', 'newsdata']).optional().default('auto').describe('The specific API to use, or "auto" for fallback.'),
});

const ArticleSchema = z.object({
  headline: z.string(),
  summary: z.string(),
  fullContent: z.string(),
  source: z.string(),
  imageUrl: z.string().url().optional(),
  url: z.string().url(),
});

const ToolOutputSchema = z.object({
    articles: z.array(ArticleSchema),
    debugUrls: z.array(z.string().url()),
});

const forbiddenKeywords = ['murder', 'rape', 'kidnap', 'assault', 'violence', 'crime', 'death', 'killed', 'shot', 'terrorist', 'attack', 'sports', 'movies', 'entertainment', 'celebrity', 'gossip'];
const forbiddenTitles = ['Legend of the Female General'];

const filterArticle = (article: any): boolean => {
    const titleLower = article.title?.toLowerCase() || '';
    const descriptionLower = article.description?.toLowerCase() || '';
    const contentLower = article.content?.toLowerCase() || '';
    if (!article.description || !article.title || article.title === '[Removed]') return false;

    if (forbiddenTitles.some(forbiddenTitle => titleLower.includes(forbiddenTitle.toLowerCase()))) {
        return false;
    }

    return !forbiddenKeywords.some(keyword => titleLower.includes(keyword) || descriptionLower.includes(keyword) || contentLower.includes(keyword));
};

// Helper to get the most complete, clean description available
const getSummaryContent = (article: any): string => {
    // Prioritize description/snippet over content to avoid API promotional text
    return article.description || article.snippet || '';
}

// Fetcher for GNews
const fetchFromGNews = async (query: string, isGeneral: boolean, sortBy: 'latest' | 'relevant'): Promise<{ articles: any[], url: string }> => {
    if (!gnewsApiKey) {
        throw new Error("GNews API key is not configured on the server. Please use AI-generated news.");
    }
    let finalQuery = query;
    if (isGeneral) {
        // GNews uses NOT operator for exclusion.
        finalQuery = `${query} NOT politics NOT entertainment NOT celebrity NOT gossip NOT crime NOT sports NOT movies`;
    }
    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(finalQuery)}&lang=en&country=in&sortby=${sortBy === 'latest' ? 'publishedAt' : 'relevance'}&apikey=${gnewsApiKey}`;
    
    console.log('Attempting to fetch from GNews URL:', url); // LOG URL BEFORE FETCH

    const response = await fetch(url);
    if (!response.ok) throw new Error(`GNews API error: ${response.statusText}`);
    const data = await response.json();
    if (data.errors) {
        throw new Error(`GNews API returned an error: ${JSON.stringify(data.errors)}`);
    }

    return {
        articles: data.articles.filter(filterArticle).map((article: any) => ({
            headline: article.title,
            summary: getSummaryContent(article),
            source: `GNews / ${article.source.name}`,
            imageUrl: article.image,
            url: article.url,
        })),
        url
    };
};

// Fetcher for NewsData.io
const fetchFromNewsData = async (query: string, isGeneral: boolean): Promise<{ articles: any[], url: string }> => {
    if (!newsdataApiKey) {
        throw new Error("NewsData.io API key is not configured on the server. Please use AI-generated news.");
    }
    let finalQuery = query;
    if (isGeneral) {
        // NewsData.io also uses NOT operator.
        finalQuery = `${query} NOT politics NOT entertainment NOT celebrity NOT gossip NOT crime NOT sports NOT movies`;
    }
    const url = `https://newsdata.io/api/1/latest?apikey=${newsdataApiKey}&q=${encodeURIComponent(finalQuery)}&language=en&country=in`;

    console.log('Attempting to fetch from NewsData.io URL:', url); // LOG URL BEFORE FETCH

    const response = await fetch(url);
    if (!response.ok) throw new Error(`NewsData.io API error: ${response.statusText}`);
    const data = await response.json();
    return {
        articles: data.results.filter(filterArticle).map((article: any) => ({
            headline: article.title,
            summary: getSummaryContent(article),
            source: `NewsData.io / ${article.source_id}`,
            imageUrl: article.image_url,
            url: article.link,
        })),
        url
    };
};

export const fetchNewsArticles = ai.defineTool(
    {
        name: 'fetchNewsArticles',
        description: 'Fetches live news articles, then uses a parser to extract the full content of each article.',
        input: { schema: NewsToolInputSchema },
        output: { schema: ToolOutputSchema },
    },
    async ({ query, isGeneral = false, sortBy, sourceApi }) => {
        let debugUrls: string[] = [];
        let fetchedArticles: any[] = [];
        
        try {
            const services = {
                gnews: () => fetchFromGNews(query, isGeneral, sortBy),
                newsdata: () => fetchFromNewsData(query, isGeneral),
            };
            
            const fetchFunction = sourceApi && sourceApi !== 'auto' ? services[sourceApi] : null;

            if (fetchFunction) {
                const { articles, url } = await fetchFunction();
                fetchedArticles = articles;
                debugUrls.push(url);
            } else {
                // Auto fallback logic
                if (!gnewsApiKey && !newsdataApiKey) {
                    throw new Error("No news API keys are configured on the server. Please use AI-generated news.");
                }

                try {
                    if (gnewsApiKey) {
                        console.log('Primary API: Trying GNews...');
                        const { articles, url } = await fetchFromGNews(query, isGeneral, sortBy);
                        fetchedArticles = articles;
                        debugUrls.push(url);
                    } else if (newsdataApiKey) {
                        // If GNews key is absent, go directly to NewsData
                        console.log('Primary API: GNews key missing, trying NewsData.io...');
                        const { articles, url } = await fetchFromNewsData(query, isGeneral);
                        fetchedArticles = articles;
                        debugUrls.push(url);
                    }
                } catch (primaryError) {
                     // Fallback to NewsData.io only if GNews was attempted and failed, and NewsData key exists
                     if (gnewsApiKey && newsdataApiKey) {
                         console.warn('GNews API failed, falling back to NewsData.io:', primaryError);
                        const { articles, url } = await fetchFromNewsData(query, isGeneral);
                        fetchedArticles = articles;
                        debugUrls.push(url);
                    } else {
                        // If no fallback is possible, re-throw the original error
                        throw primaryError;
                    }
                }
            }

            if (fetchedArticles.length === 0) {
                 return { articles: [], debugUrls };
            }

            const enrichedArticles = await Promise.all(
                fetchedArticles.slice(0, 15).map(async (article) => {
                    if (!article.url) return { ...article, fullContent: article.summary };
                    
                    try {
                        const parsed = await fetchFullArticleContent({ url: article.url });
                        return {
                            ...article,
                            fullContent: parsed.content || article.summary,
                        };
                    } catch (parseError) {
                        console.warn(`Could not parse article ${article.url}:`, parseError);
                        return { ...article, fullContent: article.summary };
                    }
                })
            );

            return { articles: enrichedArticles, debugUrls };

        } catch (error) {
            console.error('Failed to fetch or parse news from all available sources:', error);
            const articles = [{
                headline: 'News Service Unavailable',
                summary: `Could not fetch live news at this moment. The external APIs may be down or the API keys may be invalid. Error: ${(error as Error).message}`,
                fullContent: `There was an issue connecting to the live news services. Please check the server logs for more details. You can also switch to AI-generated news. \n\nError details: ${(error as Error).message}`,
                source: 'Study Buddy System',
                url: '#',
                imageUrl: undefined,
            }];
            return { articles, debugUrls };
        }
    }
);
