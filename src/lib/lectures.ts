

import { db, storage } from './firebase';
import { collection, getDocs, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import type { Lecture, LectureNote } from './types';


/**
 * SERVER-SIDE FUNCTION
 * Uploads a file buffer to Firebase Storage and adds the note metadata to Firestore.
 * This is intended to be called from a Server Action.
 *
 * @param lectureId The ID of the lecture document.
 * @param lectureTitle The title of the lecture, used for the storage path.
 * @param fileName The name of the original file.
 * @param fileType The MIME type of the file.
 * @param buffer The file content as a Buffer.
 * @returns A promise that resolves when the entire process is complete.
 */
export const uploadLectureNote = async (
    lectureId: string,
    lectureTitle: string,
    fileName: string,
    fileType: string,
    buffer: Buffer
): Promise<void> => {
    
    const storagePath = `lectures/${lectureTitle}/notes/${uuidv4()}-${fileName}`;
    const storageRef = ref(storage, storagePath);
    
    console.log("SERVER: Starting upload to:", storagePath);

    try {
        // Upload the file buffer
        const snapshot = await uploadBytes(storageRef, buffer, {
            contentType: fileType,
        });
        console.log("SERVER: Upload complete. Getting download URL.");

        // Get the download URL
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log("SERVER: Download URL received:", downloadURL);

        // Add note metadata to Firestore
        const notesRef = collection(db, 'lectures', lectureId, 'notes');
        await addDoc(notesRef, {
            name: fileName,
            url: downloadURL,
            type: 'pdf',
            uploadedAt: serverTimestamp(),
        });
        console.log("SERVER: Firestore document created.");
    } catch (error) {
        console.error("SERVER: Upload failed:", error);
        throw error;
    }
};


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
