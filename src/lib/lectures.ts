
import { db } from './firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import type { Lecture } from './types';

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
