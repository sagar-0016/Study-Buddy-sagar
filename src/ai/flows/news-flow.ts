'use server';

/**
 * @fileOverview Provides curated news articles based on a selected category,
 * either by fetching live data using a tool or by generating them with AI.
 *
 * - getNews - A function that handles fetching or generating news.
 * - NewsInput - The input type for the getNews function.
 * - NewsOutput - The return type for the getNews function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { fetchNewsArticles } from '@/ai/tools/news-tool';
import type { NewsAPIRequest } from '@/ai/tools/news-tool'; // Import the type

const NewsInputSchema = z.object({
  category: z.string().describe('The category of news, e.g., "JEE", "Literature", "UPSC", "Science".'),
  useAi: z.boolean().describe('Whether to use AI to generate news or a tool to fetch live news.'),
  sortBy: z.enum(['latest', 'relevant']).optional().describe('Sorting preference for live news. "latest" for published date, "relevant" for relevancy.'),
});
export type NewsInput = z.infer<typeof NewsInputSchema>;

const ArticleSchema = z.object({
  headline: z.string().describe('A concise and engaging headline for the news article.'),
  summary: z.string().describe('A brief, 1-2 sentence summary of the article.'),
  fullContent: z.string().describe('The full content of the article, if available.'),
  source: z.string().describe('The original source of the article, e.g., "The Hindu", "Reuters".'),
  imageUrl: z.string().optional().describe('A URL to a relevant image for the article.'),
});

const NewsOutputSchema = z.object({
  articles: z.array(ArticleSchema).describe('A list of 5-7 news articles.'),
  debugInfo: z.custom<NewsAPIRequest | { mode: string }>().optional(), // Add debug info to output
});
export type NewsOutput = z.infer<typeof NewsOutputSchema>;


export async function getNews(input: NewsInput): Promise<NewsOutput> {
  // If not using AI, directly call the tool and bypass the AI flow.
  if (!input.useAi) {
    const { articles, requestParams } = await fetchNewsArticles({ 
        query: input.category, 
        sortBy: input.sortBy || 'latest'
    });
    return { articles, debugInfo: requestParams };
  }
  // If using AI, call the generative flow.
  const aiResult = await newsGenFlow(input);
  return { ...aiResult, debugInfo: { mode: 'AI Generated' } };
}


// This flow is now ONLY for AI-generated news.
const newsGenPrompt = ai.definePrompt({
  name: 'newsGenPrompt',
  input: {schema: NewsInputSchema},
  output: {schema: z.object({ articles: z.array(ArticleSchema) })}, // Output only articles here
  prompt: `You are an expert news curator for a study application.
  Your task is to generate a list of 5-7 plausible-sounding news articles from the current year, based on the user-selected category: '{{category}}'.
  The tone should be professional and informative.
  For the 'fullContent' field, generate a plausible paragraph expanding on the summary.
  Do not include image URLs.

  **IMPORTANT CONTENT GUIDELINES:**
  - **ABSOLUTELY NO SENSATIONALISM:** Avoid clickbait headlines.
  - **STRICTLY FORBIDDEN TOPICS:** Do NOT generate any content related to rape, murder, kidnapping, violent crime, assault, abuse, gore, or any other form of graphic or disturbing events. The output must be safe-for-work and suitable for a study environment.
  - **Plausible and Factual Tone:** The articles should sound like they come from reputable news sources.
  - **Source Diversity:** Use a variety of credible sources like "The Hindu," "The Indian Express," "Livemint," "PIB India," etc.

  **CATEGORY-SPECIFIC INSTRUCTIONS:**
  - **General:** Focus on national news, science & technology, and economic developments.
  - **JEE:** Focus on exam dates, changes in patterns, counseling updates, and inspiring stories of toppers.
  - **UPSC:** Focus on policy changes, government schemes, Supreme Court rulings, and international relations relevant to the civil services exam.
  - **Science:** Focus on recent discoveries, technological advancements, and space exploration.
  - **Literature:** Provide summaries of classic book reviews, news about literary awards, or profiles of famous authors.

  Generate the response now based on the category: '{{category}}'.`,
});

const newsGenFlow = ai.defineFlow(
  {
    name: 'newsGenFlow',
    inputSchema: NewsInputSchema,
    outputSchema: z.object({ articles: z.array(ArticleSchema) }),
  },
  async input => {
    const {output} = await newsGenPrompt(input);
    return output!;
  }
);
