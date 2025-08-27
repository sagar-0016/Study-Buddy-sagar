
import { db, storage } from './firebase';
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  serverTimestamp,
  query,
  orderBy,
  collectionGroup,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import type { Doubt } from './types';
import { v4 as uuidv4 } from 'uuid';

/**
 * Uploads an image to Firebase Storage for a doubt.
 * @param {File} file - The image file to upload.
 * @returns {Promise<string>} The public URL of the uploaded image.
 */
const uploadDoubtImage = async (file: File): Promise<string> => {
    const fileId = uuidv4();
    const storageRef = ref(storage, `doubts/${fileId}-${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
}

/**
 * Adds a new doubt to a lecture's subcollection in Firestore. Handles optional image upload.
 * @param data - The data for the new doubt.
 * @returns The ID of the newly created document.
 */
export const addDoubt = async (data: {
  lectureId: string;
  lectureTitle: string;
  text: string;
  subject: string;
  imageFile?: File;
}): Promise<string> => {
  try {
    const payload: {
        text: string;
        subject: string;
        lectureId: string;
        lectureTitle: string;
        isAddressed: boolean;
        isCleared: boolean;
        createdAt: any;
        imageUrl?: string;
    } = {
      text: data.text,
      subject: data.subject,
      lectureId: data.lectureId,
      lectureTitle: data.lectureTitle,
      isAddressed: false,
      isCleared: false,
      createdAt: serverTimestamp(),
    };

    if (data.imageFile) {
        payload.imageUrl = await uploadDoubtImage(data.imageFile);
    }

    const doubtsRef = collection(db, 'lectures', data.lectureId, 'doubts');
    const newDocRef = await addDoc(doubtsRef, payload);
    return newDocRef.id;
  } catch (error) {
    console.error('Error adding doubt:', error);
    throw error;
  }
};

/**
 * Fetches all doubts from all lecture subcollections using a collection group query.
 * @returns {Promise<Doubt[]>} An array of doubt objects.
 */
export const getDoubts = async (): Promise<Doubt[]> => {
  try {
    const doubtsGroupRef = collectionGroup(db, 'doubts');
    const q = query(doubtsGroupRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Doubt)
    );
  } catch (error) {
    console.error('Error fetching doubts:', error);
    return [];
  }
};

/**
 * Marks a doubt as cleared by the user.
 * @param {string} lectureId - The ID of the parent lecture document.
 * @param {string} doubtId - The ID of the doubt document to update.
 */
export const markDoubtAsCleared = async (lectureId: string, doubtId: string): Promise<void> => {
    try {
        const doubtRef = doc(db, 'lectures', lectureId, 'doubts', doubtId);
        await updateDoc(doubtRef, {
            isCleared: true,
        });
    } catch (error) {
        console.error(`Error marking doubt ${doubtId} as cleared:`, error);
        throw error;
    }
}
