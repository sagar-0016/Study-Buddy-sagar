
'use client';

import { db, storage } from './firebase';
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  doc,
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
 * @returns A promise that resolves when the entire process is complete.
 */
export const uploadLectureNote = async (
  lectureId: string,
  lectureTitle: string,
  file: File
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
        // Can be used to display progress, but we are keeping it simple for now.
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        // Handle unsuccessful uploads
        console.error('Upload failed:', error);
        reject(error);
      },
      async () => {
        // Handle successful uploads on complete
        try {
          console.log('Upload complete, getting download URL...');
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log('File available at', downloadURL);

          // Add note metadata to Firestore
          const notesRef = collection(db, 'lectures', lectureId, 'notes');
          await addDoc(notesRef, {
            name: file.name,
            url: downloadURL,
            type: 'pdf', // Assuming only PDFs for now
            uploadedAt: serverTimestamp(),
          });
          console.log('Firestore document created.');
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
