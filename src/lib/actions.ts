
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

export async function uploadNoteAction(lectureId: string, lectureTitle: string, formData: FormData) {
    const file = formData.get('file') as File | null;
    if (!file) {
        throw new Error('No file provided.');
    }

    // Convert file to buffer to pass to server-side function
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    await uploadLectureNote(lectureId, lectureTitle, file.name, file.type, buffer);
}
