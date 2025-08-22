
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

const NewsInputSchema = z.object({
  category: z.string().describe('The category of news, e.g., "JEE", "Literature", "UPSC", "History".'),
  useAi: z.boolean().describe('Whether to use AI to generate news or a tool to fetch live news.'),
  sortBy: z.enum(['latest', 'relevant']).optional().describe('Sorting preference for live news. "latest" for published date, "relevant" for relevancy.'),
  sourceApi: z.enum(['auto', 'gnews', 'newsdata']).optional().describe('The specific API to use, or "auto" for fallback.'),
});
export type NewsInput = z.infer<typeof NewsInputSchema>;

const ArticleSchema = z.object({
  headline: z.string().describe('A concise and engaging headline for the news article.'),
  summary: z.string().describe('A brief, 1-2 sentence summary of the article.'),
  fullContent: z.string().describe('The full content of the article, if available.'),
  source: z.string().describe('The original source of the article, e.g., "The Hindu", "Reuters".'),
  imageUrl: z.string().url().optional().describe('A URL to a relevant image for the article.'),
  url: z.string().url().describe('A URL to the original article.'),
});

const NewsOutputSchema = z.object({
  articles: z.array(ArticleSchema).describe('A list of 5-7 news articles.'),
  debugUrls: z.array(z.string().url()).optional().describe('A list of URLs fetched for debugging.'),
});
export type NewsOutput = z.infer<typeof NewsOutputSchema>;


export async function getNews(input: NewsInput): Promise<NewsOutput> {
  // If not using AI, directly call the tool and bypass the AI flow.
  if (!input.useAi) {
    let query = input.category;
    // Special handling for combined category
    if (input.category === 'History & Literature') {
      query = '"Indian History" OR "Indian Literature"';
    }

    const { articles, debugUrls } = await fetchNewsArticles({ 
        query: query, 
        isGeneral: input.category === 'General',
        sortBy: input.sortBy || 'latest',
        sourceApi: input.sourceApi || 'auto',
    });
    return { articles, debugUrls };
  }
  // If using AI, call the generative flow.
  return await newsGenFlow(input);
}


// This flow is now ONLY for AI-generated news.
const newsGenPrompt = ai.definePrompt({
  name: 'newsGenPrompt',
  input: {schema: NewsInputSchema},
  output: {schema: NewsOutputSchema}, 
  prompt: `You are an expert news curator for a study application.
  Your task is to generate a list of 5-7 plausible-sounding news articles from the current year, based on the user-selected category: '{{category}}'.
  The tone should be professional and informative.
  For the 'fullContent' field, generate a plausible paragraph expanding on the summary.
  For the 'url' field, use a placeholder like 'https://example.com/news'.
  For the 'imageUrl' field, use a placeholder like 'https://placehold.co/600x400.png' and add a data-ai-hint attribute with one or two relevant keywords.

  **IMPORTANT CONTENT GUIDELINES:**
  - **ABSOLUTELY NO SENSATIONALISM:** Avoid clickbait headlines.
  - **STRICTLY FORBIDDEN TOPICS:** Do NOT generate any content related to rape, murder, kidnapping, violent crime, assault, abuse, gore, or any other form of graphic or disturbing events. The output must be safe-for-work and suitable for a study environment.
  - **Plausible and Factual Tone:** The articles should sound like they come from reputable news sources.
  - **Source Diversity:** Use a variety of credible sources like "The Hindu," "The Indian Express," "Livemint," "PIB India," etc.

  **CATEGORY-SPECIFIC INSTRUCTIONS:**
  - **General:** Focus on national news, science & technology, and economic developments.
  - **JEE:** Focus on exam dates, changes in patterns, counseling updates, and inspiring stories of toppers.
  - **UPSC:** Focus on policy changes, government schemes, Supreme Court rulings, and international relations relevant to the civil services exam.
  - **History & Literature:** Provide a mix of summaries of recent historical findings, museum exhibitions, profiles of historical figures, classic book reviews, news about literary awards, or profiles of famous authors.

  Generate the response now based on the category: '{{category}}'.`,
});

const newsGenFlow = ai.defineFlow(
  {
    name: 'newsGenFlow',
    inputSchema: NewsInputSchema,
    outputSchema: NewsOutputSchema,
  },
  async input => {
    const {output} = await newsGenPrompt(input);
    return output!;
  }
);
