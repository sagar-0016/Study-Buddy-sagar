'use server';

import {
  getMotivation as getMotivationFlow,
  type MotivationInput,
} from '@/ai/flows/motivation-corner';
import {
  personalizedFeedback as personalizedFeedbackFlow,
  type PersonalizedFeedbackInput,
} from '@/ai/flows/personalized-feedback';
import {
  getNews as getNewsFlow,
  type NewsInput,
  type NewsOutput,
} from '@/ai/flows/news-flow';

export async function getMotivationAction(input: MotivationInput) {
  const result = await getMotivationFlow(input);
  return result;
}

export async function getPersonalizedFeedbackAction(
  input: PersonalizedFeedbackInput
) {
  const result = await personalizedFeedbackFlow(input);
  return result;
}

export async function getNewsAction(input: NewsInput): Promise<NewsOutput> {
  const result = await getNewsFlow(input);
  return result;
}
