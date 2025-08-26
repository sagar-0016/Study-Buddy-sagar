

'use client';

import { db, storage } from './firebase';
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import type { Lecture, LectureNote } from './types';

/**
 * CLIENT-SIDE FUNCTION
 * Uploads a file from the user's browser to Firebase Storage, then adds the
 * note metadata to Firestore. This function should be called from a component.
 *
 * @param lectureId The ID of the lecture document.
 * @param lectureTitle The title of the lecture, used for the storage path.
 * @param file The file object from an input element.
 * @param onProgress A callback function to report upload progress.
 * @returns A promise that resolves when the entire process is complete.
 */
export const uploadLectureNote = async (
  lectureId: string,
  lectureTitle: string,
  file: File,
  onProgress: (progress: number) => void
): Promise<void> => {
  if (!file) {
    throw new Error('File is required for upload.');
  }

  const storagePath = `lectures/${lectureTitle}/notes/${uuidv4()}-${file.name}`;
  const storageRef = ref(storage, storagePath);

  return new Promise((resolve, reject) => {
    const uploadTask = uploadBytesResumable(storageRef, file, {
      contentType: file.type,
    });

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress(progress);
      },
      (error) => {
        console.error('Upload failed:', error);
        reject(error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const notesRef = collection(db, 'lectures', lectureId, 'notes');
          await addDoc(notesRef, {
            name: file.name,
            url: downloadURL,
            type: 'pdf',
            uploadedAt: serverTimestamp(),
          });
          resolve();
        } catch (error) {
          console.error('Failed to get download URL or write to Firestore:', error);
          reject(error);
        }
      }
    );
  });
};

/**
 * Deletes a note document from Firestore.
 * This does NOT delete the file from Firebase Storage.
 * @param lectureId The ID of the lecture containing the note.
 * @param noteId The ID of the note document to delete.
 */
export const deleteLectureNote = async (lectureId: string, noteId: string): Promise<void> => {
    try {
        const noteRef = doc(db, 'lectures', lectureId, 'notes', noteId);
        await deleteDoc(noteRef);
    } catch (error) {
        console.error(`Error deleting note ${noteId} from lecture ${lectureId}:`, error);
        throw error;
    }
}


/**
 * Fetches all notes for a specific lecture.
 * @param {string} lectureId - The ID of the lecture document.
 * @returns {Promise<LectureNote[]>} An array of lecture note objects.
 */
export const getLectureNotes = async (
  lectureId: string
): Promise<LectureNote[]> => {
  try {
    const notesRef = collection(db, 'lectures', lectureId, 'notes');
    const querySnapshot = await getDocs(notesRef);
    return querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as LectureNote)
    );
  } catch (error) {
    console.error(`Error fetching notes for lecture ${lectureId}:`, error);
    return [];
  }
};

/**
 * Adds a feedback entry for a specific lecture to a nested collection.
 * @param {string} lectureId - The ID of the lecture.
 * @param {string} feedbackText - The feedback content.
 * @param {number} [rating] - The rating given by the user (e.g., 1-5). Optional.
 */
export const addLectureFeedback = async (
  lectureId: string,
  feedbackText: string,
  rating?: number
): Promise<void> => {
  try {
    const feedbackRef = collection(db, 'lectures', lectureId, 'feedback');

    const feedbackData: {
      feedback: string;
      submittedAt: any;
      rating?: number;
    } = {
      feedback: feedbackText,
      submittedAt: serverTimestamp(),
    };

    if (rating !== undefined) {
      feedbackData.rating = rating;
    }

    await addDoc(feedbackRef, feedbackData);
  } catch (error) {
    console.error(`Error submitting feedback for lecture ${lectureId}:`, error);
    throw error;
  }
};
