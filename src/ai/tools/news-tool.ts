
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
  imageUrl: z.string().optional(),
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
    if (!gnewsApiKey) throw new Error("GNews API key is missing.");
    let finalQuery = query;
    if (isGeneral) {
        finalQuery = `${query} -politics -entertainment -celebrity -gossip -crime -sports -movies`;
    }
    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(finalQuery)}&lang=en&country=in&sortby=${sortBy === 'latest' ? 'publishedAt' : 'relevance'}&apikey=${gnewsApiKey}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`GNews API error: ${response.statusText}`);
    const data = await response.json();
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
    if (!newsdataApiKey) throw new Error("NewsData.io API key is missing.");
    let finalQuery = query;
    if (isGeneral) {
        finalQuery = `${query} NOT politics NOT entertainment NOT celebrity NOT gossip NOT crime NOT sports NOT movies`;
    }
    const url = `https://newsdata.io/api/1/latest?apikey=${newsdataApiKey}&q=${encodeURIComponent(finalQuery)}&language=en&country=in`;
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
        const debugUrls: string[] = [];
        let fetchedArticles: any[] = [];
        let fetchedUrl = '';

        const services = {
            gnews: () => fetchFromGNews(query, isGeneral, sortBy),
            newsdata: () => fetchFromNewsData(query, isGeneral),
        };
        
        const fetchFunction = sourceApi && sourceApi !== 'auto' ? services[sourceApi] : null;

        try {
            if (fetchFunction) {
                const { articles, url } = await fetchFunction();
                fetchedArticles = articles;
                fetchedUrl = url;
                debugUrls.push(fetchedUrl);
            } else {
                // Auto fallback logic
                try {
                    const { articles, url } = await fetchFromGNews(query, isGeneral, sortBy);
                    fetchedArticles = articles;
                    fetchedUrl = url;
                    debugUrls.push(fetchedUrl);
                    if (articles.length === 0) throw new Error("No articles from GNews");
                } catch (error) {
                    console.error('GNews API failed, falling back to NewsData.io:', error);
                    const { articles, url } = await fetchFromNewsData(query, isGeneral);
                    fetchedArticles = articles;
                    fetchedUrl = url;
                    debugUrls.push(fetchedUrl);
                    if (articles.length === 0) throw new Error("No articles from NewsData.io");
                }
            }

            if (fetchedArticles.length === 0) {
                 return { articles: [], debugUrls };
            }

            // Step 2: Parse each article for full content
            const enrichedArticles = await Promise.all(
                fetchedArticles.map(async (article) => {
                    if (!article.url) return { ...article, fullContent: article.summary };
                    
                    const parsed = await fetchFullArticleContent({ url: article.url });
                    
                    return {
                        ...article,
                        // Use parsed content if available, otherwise fall back to summary
                        fullContent: parsed.content || article.summary,
                    };
                })
            );

            return { articles: enrichedArticles, debugUrls };

        } catch (error) {
            console.error('Failed to fetch or parse news:', error);
            const articles = [{
                headline: 'News Service Failed',
                summary: `Could not fetch or parse news at this moment. Error: ${(error as Error).message}`,
                fullContent: `There was an issue connecting to the news services or parsing the articles. Please check your internet connection or try again later. You can also switch to AI-generated news.`,
                source: 'Study Buddy System',
                url: '#',
            }];
            return { articles, debugUrls };
        }
    }
);
