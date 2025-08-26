
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
import { uploadLectureNote } from '@/lib/lectures';

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

export async function uploadNoteAction(formData: FormData): Promise<{ success: boolean, error?: string }> {
  const lectureId = formData.get('lectureId') as string;
  const lectureTitle = formData.get('lectureTitle') as string;
  const file = formData.get('file') as File;

  if (!lectureId || !lectureTitle || !file) {
    return { success: false, error: 'Missing required form data.' };
  }

  try {
    // This function doesn't take an onProgress callback because server actions can't stream progress back to the client yet.
    await uploadLectureNote(lectureId, lectureTitle, file, () => {});
    return { success: true };
  } catch (error) {
    console.error("Upload action failed:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred during upload.";
    return { success: false, error: errorMessage };
  }
}
