'use server';

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import Mercury from '@postlight/mercury-parser';

const ArticleParserInputSchema = z.object({
    url: z.string().url().describe("The URL of the article to parse."),
});

const ArticleParserOutputSchema = z.object({
    content: z.string().nullable().describe("The parsed HTML content of the article, or null if parsing failed."),
});

export const fetchFullArticleContent = ai.defineTool(
    {
        name: 'fetchFullArticleContent',
        description: 'Fetches and parses the full content of a given article URL using Mercury Parser.',
        input: { schema: ArticleParserInputSchema },
        output: { schema: ArticleParserOutputSchema },
    },
    async ({ url }) => {
        try {
            const parsedArticle = await Mercury.parse(url, { contentType: 'html' });
            return {
                content: parsedArticle.content,
            };
        } catch (error) {
            console.error(`Mercury Parser failed for URL ${url}:`, error);
            return {
                content: null, // Return null on failure to be handled by the caller
            };
        }
    }
);
