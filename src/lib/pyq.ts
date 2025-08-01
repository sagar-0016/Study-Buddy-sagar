
import { db } from './firebase';
import { collection, doc, getDocs, setDoc, serverTimestamp } from 'firebase/firestore';
import type { PyqProgress } from './types';

/**
 * Updates the completion status for a specific chapter's PYQs in Firestore.
 * @param chapterKey - A unique identifier for the chapter (e.g., 'Physics-Mechanics').
 * @param completed - A boolean indicating if the PYQs are completed.
 */
export const updatePyqStatus = async (
  chapterKey: string,
  completed: boolean
): Promise<void> => {
  try {
    const progressDocRef = doc(db, 'pyq-progress', chapterKey);
    await setDoc(
      progressDocRef,
      {
        completed,
        lastUpdated: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error(`Error updating PYQ progress for ${chapterKey}:`, error);
  }
};

/**
 * Fetches all PYQ progress data from the 'pyq-progress' collection.
 * @returns {Promise<PyqProgress[]>} An array of progress data for all chapters.
 */
export const getPyqProgress = async (): Promise<PyqProgress[]> => {
  try {
    const progressCollectionRef = collection(db, 'pyq-progress');
    const querySnapshot = await getDocs(progressCollectionRef);

    if (querySnapshot.empty) {
      return [];
    }
    
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        completed: doc.data().completed,
    }));

  } catch (error) {
    console.error("Error fetching PYQ progress data:", error);
    return [];
  }
};
