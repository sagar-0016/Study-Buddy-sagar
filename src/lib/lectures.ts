

import { db, storage } from './firebase';
import { collection, getDocs, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import type { Lecture, LectureNote } from './types';


/**
 * SERVER-SIDE-ONLY HELPER
 * Uploads a PDF file buffer to Firebase Storage and returns the public download URL.
 * @param fileBuffer The buffer of the file to upload.
 * @param fileName The name of the original file.
 * @param lectureTitle The title of the lecture, used for creating the folder path.
 * @returns {Promise<string>} The public URL of the uploaded video.
 */
export const uploadPdfAndGetUrl = async (
    fileBuffer: ArrayBuffer,
    fileName: string,
    lectureTitle: string
): Promise<string> => {
    const storagePath = `lectures/${lectureTitle}/notes/${fileName}`;
    const storageRef = ref(storage, storagePath);
    const snapshot = await uploadBytes(storageRef, fileBuffer, {
        contentType: 'application/pdf'
    });
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
}

/**
 * SERVER-SIDE-ONLY HELPER
 * Adds a note record to a lecture's subcollection in Firestore.
 * @param lectureId The ID of the lecture document.
 * @param noteName The name of the note file.
 * @param noteUrl The public URL of the note file.
 */
export const addNoteToLecture = async (
    lectureId: string,
    noteName: string,
    noteUrl: string
): Promise<void> => {
    const notesRef = collection(db, 'lectures', lectureId, 'notes');
    await addDoc(notesRef, {
        name: noteName,
        url: noteUrl,
        type: 'pdf',
        uploadedAt: serverTimestamp(),
    });
}


/**
 * Fetches all lectures from the 'lectures' collection in Firestore.
 * @returns {Promise<Lecture[]>} An array of lecture objects.
 */
export const getLectures = async (): Promise<Lecture[]> => {
  try {
    const lecturesRef = collection(db, 'lectures');
    const querySnapshot = await getDocs(lecturesRef);

    if (querySnapshot.empty) {
      return [];
    }

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    } as Lecture));

  } catch (error) {
    console.error("Error fetching lectures:", error);
    return [];
  }
};

/**
 * Fetches a single lecture by its ID.
 * @param {string} lectureId - The ID of the lecture document.
 * @returns {Promise<Lecture | null>} A lecture object or null if not found.
 */
export const getLectureById = async (lectureId: string): Promise<Lecture | null> => {
    try {
        const lectureRef = doc(db, 'lectures', lectureId);
        const docSnap = await getDoc(lectureRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as Lecture;
        }
        return null;
    } catch (error) {
        console.error(`Error fetching lecture ${lectureId}:`, error);
        return null;
    }
}

/**
 * Fetches all notes for a specific lecture.
 * @param {string} lectureId - The ID of the lecture document.
 * @returns {Promise<LectureNote[]>} An array of lecture note objects.
 */
export const getLectureNotes = async (lectureId: string): Promise<LectureNote[]> => {
    try {
        const notesRef = collection(db, 'lectures', lectureId, 'notes');
        const querySnapshot = await getDocs(notesRef);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as LectureNote));
    } catch (error) {
        console.error(`Error fetching notes for lecture ${lectureId}:`, error);
        return [];
    }
}


/**
 * Adds a feedback entry for a specific lecture to a nested collection.
 * @param {string} lectureId - The ID of the lecture.
 * @param {string} feedbackText - The feedback content.
 * @param {number} [rating] - The rating given by the user (e.g., 1-5). Optional.
 */
export const addLectureFeedback = async (lectureId: string, feedbackText: string, rating?: number): Promise<void> => {
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
}
