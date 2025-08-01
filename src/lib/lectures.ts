
import { db, storage } from './firebase';
import { collection, getDocs, query, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import type { Lecture } from './types';

/**
 * Uploads a video to Firebase Storage and returns the download URL.
 * @param {File} file - The video file to upload.
 * @returns {Promise<string>} The public URL of the uploaded video.
 */
const uploadVideo = async (file: File): Promise<string> => {
    const fileId = uuidv4();
    const storageRef = ref(storage, `lectures/${fileId}-${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
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
      thumbnailUrl: `https://placehold.co/1280x720.png`, // Generic placeholder
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
    // It might be useful to order them, e.g., by subject or a timestamp if added later
    const q = query(lecturesRef, orderBy('subject')); 
    const querySnapshot = await getDocs(q);

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
