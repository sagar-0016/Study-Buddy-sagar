

import { db, storage } from './firebase';
import { collection, getDocs, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import type { Lecture, LectureNote } from './types';
import { uploadNoteAction } from './actions';

/**
 * Uploads a video to Firebase Storage and returns the download URL.
 * @param {File} file - The video file to upload.
 * @returns {Promise<string>} The public URL of the uploaded video.
 */
const uploadVideo = async (file: File): Promise<string> => {
    const fileId = uuidv4();
    const storageRef = ref(storage, `lectures/${fileId}-${file.name}`);
    const snapshot = await uploadBytes(storageRef, file, {
        contentType: 'video/mp4' // Set appropriate content type
    });
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
}

/**
 * Adds a new lecture to Firestore after uploading its video.
 * @param lectureData - The metadata and video file for the new lecture.
 */
export const addLecture = async (lectureData: {
  title: string;
  description: string;
  subject: string;
  channel: string;
  duration: string;
  videoFile: File;
}): Promise<string | null> => {
  try {
    const videoUrl = await uploadVideo(lectureData.videoFile);

    const lecturesRef = collection(db, 'lectures');
    const newDocRef = await addDoc(lecturesRef, {
      title: lectureData.title,
      description: lectureData.description,
      subject: lectureData.subject,
      channel: lectureData.channel,
      duration: lectureData.duration,
      videoUrl: videoUrl,
      thumbnailUrl: `https://placehold.co/1280x720.png`,
      createdAt: serverTimestamp(),
    });
    return newDocRef.id;
  } catch (error) {
    console.error('Error adding lecture:', error);
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
 * Uploads a PDF note to Firebase Storage BY THE SERVER and adds its reference to Firestore.
 * This function is called by a server action.
 * @param lectureId The ID of the lecture document.
 * @param lectureTitle The title of the lecture, used for creating the folder path.
 * @param file The PDF file to upload.
 */
export const uploadPdfNote = async (
    lectureId: string,
    lectureTitle: string,
    file: File,
): Promise<void> => {
    if (!file) {
        throw new Error("No file provided for upload.");
    }
    const storagePath = `lectures/${lectureTitle}/${file.name}`;
    const storageRef = ref(storage, storagePath);

    // Upload the file
    const snapshot = await uploadBytes(storageRef, file, {
        contentType: 'application/pdf'
    });

    // Get the public URL
    const downloadURL = await getDownloadURL(snapshot.ref);

    // Add reference to Firestore
    const notesRef = collection(db, 'lectures', lectureId, 'notes');
    await addDoc(notesRef, {
        name: file.name,
        url: downloadURL,
        type: 'pdf',
        uploadedAt: serverTimestamp()
    });
};


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
