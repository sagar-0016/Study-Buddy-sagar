

import { db, storage } from './firebase';
import { collection, getDocs, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, UploadTaskSnapshot } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import type { Lecture, LectureNote } from './types';

/**
 * Uploads a video to Firebase Storage and returns the download URL.
 * @param {File} file - The video file to upload.
 * @returns {Promise<string>} The public URL of the uploaded video.
 */
const uploadVideo = async (file: File): Promise<string> => {
    const fileId = uuidv4();
    const storageRef = ref(storage, `lectures/${fileId}-${file.name}`);
    const snapshot = await uploadBytesResumable(storageRef, file);
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
 * Uploads a PDF note to Firebase Storage, reports progress, and adds its reference to Firestore.
 * This function is wrapped in a Promise to correctly handle the asynchronous upload events.
 * @param lectureId The ID of the lecture document.
 * @param lectureTitle The title of the lecture, used for the folder path.
 * @param file The PDF file to upload.
 * @param onProgress A callback function to report upload progress (0-100).
 */
export const uploadLectureNote = (
    lectureId: string, 
    lectureTitle: string, 
    file: File,
    onProgress: (progress: number) => void
): Promise<void> => {
    return new Promise((resolve, reject) => {
        const sanitizedTitle = lectureTitle.replace(/[^a-zA-Z0-9]/g, '_');
        const storagePath = `lectures/${sanitizedTitle}/${uuidv4()}-${file.name}`;
        const storageRef = ref(storage, storagePath);
        
        // Define metadata to make the file public
        const metadata = {
            contentType: 'application/pdf',
        };

        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        uploadTask.on('state_changed',
            (snapshot: UploadTaskSnapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                onProgress(progress);
            },
            (error) => {
                console.error(`Error during note upload for lecture ${lectureId}:`, error);
                reject(error);
            },
            async () => {
                try {
                    // Construct the public URL manually.
                    // This creates a permanent, non-tokenized URL.
                    const bucket = uploadTask.snapshot.ref.bucket;
                    const path = uploadTask.snapshot.ref.fullPath;
                    const downloadURL = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(path)}?alt=media`;
                    
                    const notesRef = collection(db, 'lectures', lectureId, 'notes');
                    await addDoc(notesRef, {
                        name: file.name,
                        url: downloadURL,
                        type: 'pdf',
                        uploadedAt: serverTimestamp()
                    });
                    onProgress(100); 
                    resolve();
                } catch (firestoreError) {
                    console.error(`Error adding note to Firestore for lecture ${lectureId}:`, firestoreError);
                    reject(firestoreError);
                }
            }
        );
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
