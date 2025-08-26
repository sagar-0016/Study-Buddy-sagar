

import { db, storage } from './firebase';
import { collection, getDocs, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import type { Lecture, LectureNote } from './types';


/**
 * CLIENT-SIDE FUNCTION
 * Uploads a PDF file to Firebase Storage, adds the note to the lecture's subcollection in Firestore,
 * and reports progress.
 *
 * @param lectureId The ID of the lecture document.
 * @param lectureTitle The title of the lecture, used for the storage path.
 * @param file The PDF file to upload.
 * @param onProgress A callback function to report upload progress (0-100).
 * @returns A promise that resolves when the entire process is complete.
 */
export const uploadLectureNote = (
    lectureId: string,
    lectureTitle: string,
    file: File,
    onProgress: (progress: number) => void
): Promise<void> => {
    return new Promise((resolve, reject) => {
        const storagePath = `lectures/${lectureTitle}/notes/${uuidv4()}-${file.name}`;
        const storageRef = ref(storage, storagePath);

        const uploadTask = uploadBytesResumable(storageRef, file, {
            contentType: 'application/pdf',
        });

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                onProgress(Math.round(progress));
            },
            (error) => {
                console.error("Upload failed:", error);
                reject(error);
            },
            async () => {
                try {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    
                    // Add note metadata to Firestore
                    const notesRef = collection(db, 'lectures', lectureId, 'notes');
                    await addDoc(notesRef, {
                        name: file.name,
                        url: downloadURL,
                        type: 'pdf',
                        uploadedAt: serverTimestamp(),
                    });
                    
                    resolve();
                } catch (error) {
                    console.error("Failed to get download URL or write to Firestore:", error);
                    reject(error);
                }
            }
        );
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
