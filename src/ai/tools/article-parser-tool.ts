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
        description: 'Fetches and parses the full content of a given article URL using Mercury Parser, then cleans it.',
        input: { schema: ArticleParserInputSchema },
        output: { schema: ArticleParserOutputSchema },
    },
    async ({ url }) => {
        try {
            const parsedArticle = await Mercury.parse(url, { contentType: 'html' });
            let cleanContent = parsedArticle.content;

            if (cleanContent) {
                // Define the markers for cleaning
                const startMarker = "Share AA +Text Size Small Medium Large";
                const endMarker = "End of Article";

                // 1. Remove header cruft if the marker exists
                const startMarkerIndex = cleanContent.indexOf(startMarker);
                if (startMarkerIndex !== -1) {
                    cleanContent = cleanContent.substring(startMarkerIndex + startMarker.length);
                }

                // 2. Remove footer cruft if the marker exists
                const endMarkerIndex = cleanContent.indexOf(endMarker);
                if (endMarkerIndex !== -1) {
                    cleanContent = cleanContent.substring(0, endMarkerIndex);
                }
            }

            return {
                content: cleanContent,
            };
        } catch (error) {
            console.error(`Mercury Parser failed for URL ${url}:`, error);
            return {
                content: null, // Return null on failure to be handled by the caller
            };
        }
    }
);
