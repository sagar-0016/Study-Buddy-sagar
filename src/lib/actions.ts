"use server";

import {
  getMotivation as getMotivationFlow,
  type MotivationInput,
} from "@/ai/flows/motivation-corner";
import {
  personalizedFeedback as personalizedFeedbackFlow,
  type PersonalizedFeedbackInput,
} from "@/ai/flows/personalized-feedback";

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
