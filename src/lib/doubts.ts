

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
  where,
  QueryConstraint,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import type { Doubt, AccessLevel } from './types';
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
 * Adds a new doubt to a lecture's subcollection or the general doubts collection in Firestore.
 * Handles optional image upload and includes access level.
 * @param data - The data for the new doubt.
 * @returns The ID of the newly created document.
 */
export const addDoubt = async (data: {
  text: string;
  subject: string;
  accessLevel: AccessLevel;
  lectureId?: string;
  lectureTitle?: string;
  imageFile?: File;
}): Promise<string> => {
  try {
    const payload: {
        text: string;
        subject: string;
        accessLevel: AccessLevel;
        isAddressed: boolean;
        isCleared: boolean;
        createdAt: any;
        lectureId?: string;
        lectureTitle?: string;
        imageUrl?: string;
    } = {
      text: data.text,
      subject: data.subject,
      accessLevel: data.accessLevel,
      isAddressed: false,
      isCleared: false,
      createdAt: serverTimestamp(),
    };

    if (data.imageFile) {
        payload.imageUrl = await uploadDoubtImage(data.imageFile);
    }
    
    let newDocRef;
    if (data.lectureId && data.lectureTitle) {
        // Lecture-specific doubt
        payload.lectureId = data.lectureId;
        payload.lectureTitle = data.lectureTitle;
        const doubtsRef = collection(db, 'lectures', data.lectureId, 'doubts');
        newDocRef = await addDoc(doubtsRef, payload);
    } else {
        // General doubt
        const doubtsRef = collection(db, 'doubts');
        newDocRef = await addDoc(doubtsRef, payload);
    }

    return newDocRef.id;
  } catch (error) {
    console.error('Error adding doubt:', error);
    throw error;
  }
};


/**
 * Fetches all relevant doubts based on user's access level.
 * Full access sees all doubts. Limited access sees only limited-access doubts.
 * This function correctly combines lecture-specific doubts and general doubts without duplication.
 * @param {AccessLevel} accessLevel - The access level of the current user.
 * @returns {Promise<Doubt[]>} An array of doubt objects.
 */
export const getDoubts = async (accessLevel: AccessLevel): Promise<Doubt[]> => {
  try {
    const allDoubtsQuery = query(collectionGroup(db, 'doubts'));

    const accessConstraints: QueryConstraint[] = [];
    if (accessLevel === 'limited') {
      accessConstraints.push(where('accessLevel', '==', 'limited'));
    }

    const finalQuery = query(allDoubtsQuery, ...accessConstraints);
    const querySnapshot = await getDocs(finalQuery);

    const allDoubts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Doubt));
    
    // Sort all doubts by creation date descending
    allDoubts.sort((a, b) => {
        const timeA = a.createdAt?.toDate().getTime() || 0;
        const timeB = b.createdAt?.toDate().getTime() || 0;
        return timeB - timeA;
    });

    return allDoubts;
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
