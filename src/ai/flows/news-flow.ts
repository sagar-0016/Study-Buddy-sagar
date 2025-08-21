
'use server';

/**
 * @fileOverview Provides curated news articles based on a selected category.
 *
 * - getNews - A function that generates news articles for a given category.
 * - NewsInput - The input type for the getNews function.
 * - NewsOutput - The return type for the getNews function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const NewsInputSchema = z.object({
  category: z.string().describe('The category of news to fetch, e.g., "JEE News", "Literature", "UPSC Articles".'),
});
export type NewsInput = z.infer<typeof NewsInputSchema>;

const ArticleSchema = z.object({
  headline: z.string().describe('A concise and engaging headline for the news article.'),
  summary: z.string().describe('A brief, 1-2 sentence summary of the article.'),
  source: z.string().describe('A plausible and well-known news source, e.g., "The Hindu", "The Indian Express", "PIB India".'),
  imageKeywords: z.string().describe('One or two keywords for a relevant placeholder image, e.g., "student examination", "indian parliament", "classic book".'),
});

const NewsOutputSchema = z.object({
  articles: z.array(ArticleSchema).describe('A list of 5-7 generated news articles.'),
});
export type NewsOutput = z.infer<typeof NewsOutputSchema>;

export async function getNews(input: NewsInput): Promise<NewsOutput> {
  return newsFlow(input);
}

const newsPrompt = ai.definePrompt({
  name: 'newsPrompt',
  input: {schema: NewsInputSchema},
  output: {schema: NewsOutputSchema},
  prompt: `You are an expert news curator for a study application.
  Your task is to generate a list of 5-7 recent, relevant, and insightful news articles or summaries based on the user-selected category: '{{category}}'.

  **IMPORTANT CONTENT GUIDELINES:**
  - **ABSOLUTELY NO SENSATIONALISM:** Avoid clickbait headlines.
  - **STRICTLY FORBIDDEN TOPICS:** Do NOT generate any content related to rape, murder, kidnapping, violent crime, assault, abuse, gore, or any other form of graphic or disturbing events. The output must be safe-for-work and suitable for a study environment.
  - **Plausible and Factual Tone:** The articles should sound like they come from reputable news sources.
  - **Source Diversity:** Use a variety of credible sources like "The Hindu," "The Indian Express," "Livemint," "PIB India," etc.

  **CATEGORY-SPECIFIC INSTRUCTIONS:**
  - **General News:** Focus on national news, science & technology, and economic developments.
  - **JEE News:** Focus on exam dates, changes in patterns, counseling updates, and inspiring stories of toppers.
  - **UPSC News:** Focus on policy changes, government schemes, Supreme Court rulings, and international relations relevant to the civil services exam.
  - **UPSC Articles:** Generate summaries of longer, editorial-style articles on topics like socio-economic issues, environmental policy, or Indian history.
  - **Literature:** Provide summaries of classic book reviews, news about literary awards, or profiles of famous authors.

  Generate the response now based on the category: '{{category}}'.`,
});

const newsFlow = ai.defineFlow(
  {
    name: 'newsFlow',
    inputSchema: NewsInputSchema,
    outputSchema: NewsOutputSchema,
  },
  async input => {
    const {output} = await newsPrompt(input);
    return output!;
  }
);
