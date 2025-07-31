'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing personalized feedback
 * to students based on their quiz history.
 *
 * - personalizedFeedback - A function that generates personalized feedback for a student.
 * - PersonalizedFeedbackInput - The input type for the personalizedFeedback function.
 * - PersonalizedFeedbackOutput - The return type for the personalizedFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedFeedbackInputSchema = z.object({
  quizHistory: z
    .string()
    .describe("A string containing the student's quiz history, including topics and scores."),
});
export type PersonalizedFeedbackInput = z.infer<typeof PersonalizedFeedbackInputSchema>;

const PersonalizedFeedbackOutputSchema = z.object({
  feedback: z.string().describe('Personalized feedback for the student.'),
  suggestedTopics: z
    .string()
    .describe('Suggested topics for the student to review.'),
});
export type PersonalizedFeedbackOutput = z.infer<typeof PersonalizedFeedbackOutputSchema>;

export async function personalizedFeedback(input: PersonalizedFeedbackInput): Promise<PersonalizedFeedbackOutput> {
  return personalizedFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedFeedbackPrompt',
  input: {schema: PersonalizedFeedbackInputSchema},
  output: {schema: PersonalizedFeedbackOutputSchema},
  prompt: `You are an AI assistant providing personalized feedback to students based on their quiz history.

  Analyze the following quiz history and provide feedback to the student. Suggest specific topics for the student to review to improve their understanding.

  Quiz History:
  {{quizHistory}}

  Format your response as follows:

  Feedback: [Personalized feedback based on the quiz history]
  Suggested Topics: [List of topics to review]`,
});

const personalizedFeedbackFlow = ai.defineFlow(
  {
    name: 'personalizedFeedbackFlow',
    inputSchema: PersonalizedFeedbackInputSchema,
    outputSchema: PersonalizedFeedbackOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
