'use server';

/**
 * @fileOverview Provides personalized, playful, and flirtatious motivation from 'Saurabh' to 'Sagar'.
 *
 * - getMotivation - A function that generates personalized motivation.
 * - MotivationInput - The input type for the getMotivation function.
 * - MotivationOutput - The return type for the getMotivation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { getRandomMotivationByMood } from '@/lib/motivation';

const MotivationInputSchema = z.object({
  senderName: z.string().describe("The name of the sender, e.g., 'Saurabh'."),
  recipientName: z.string().describe("The name of the recipient, e.g., 'Sagar'."),
  topic: z.string().describe('The topic the recipient is studying.'),
  quizScore: z.number().describe('The recipient\'s quiz score on the topic.'),
  currentMood: z.string().describe('The current mood of the recipient.'),
});
export type MotivationInput = z.infer<typeof MotivationInputSchema>;

const MotivationOutputSchema = z.object({
  motivation: z.string().describe('A personalized, playful, and flirtatious motivational message.'),
});
export type MotivationOutput = z.infer<typeof MotivationOutputSchema>;

// Extend the input schema for the prompt to include the fetched quote
const MotivationPromptInputSchema = MotivationInputSchema.extend({
    fetchedQuote: z.string().describe("A pre-fetched quote based on the user's mood."),
});

export async function getMotivation(input: MotivationInput): Promise<MotivationOutput> {
  // 1. Fetch a random quote based on the mood
  const fetchedQuote = await getRandomMotivationByMood(input.currentMood);

  // 2. Call the flow with the original input AND the fetched quote
  return motivationFlow({ ...input, fetchedQuote });
}

const motivationPrompt = ai.definePrompt({
  name: 'motivationPrompt',
  input: {schema: MotivationPromptInputSchema},
  output: {schema: MotivationOutputSchema},
  prompt: `You are Saurabh, and you are providing playful and flirtatious motivation to Sagar.

  Sagar is currently studying {{topic}} and is feeling {{currentMood}}.

  Use the following quote as the core of your message, but rephrase it in your own playful, flirtatious, and encouraging voice. Make it sound like it's coming from you naturally.

  Core Quote: "{{fetchedQuote}}"
  
  Keep your final message short, fun, and personal to Sagar.
  `,
});

const motivationFlow = ai.defineFlow(
  {
    name: 'motivationFlow',
    inputSchema: MotivationPromptInputSchema, // The flow now expects the fetchedQuote
    outputSchema: MotivationOutputSchema,
  },
  async input => {
    const {output} = await motivationPrompt(input);
    return output!;
  }
);
