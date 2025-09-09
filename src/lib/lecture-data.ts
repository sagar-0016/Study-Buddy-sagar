
import { db } from './firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import type { Lecture } from './types';

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

    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Lecture)
    );
  } catch (error) {
    console.error('Error fetching lectures:', error);
    return [];
  }
};

/**
 * Fetches a single lecture by its ID.
 * @param {string} lectureId - The ID of the lecture document.
 * @returns {Promise<Lecture | null>} A lecture object or null if not found.
 */
export const getLectureById = async (
  lectureId: string
): Promise<Lecture | null> => {
  try {
    const lectureRef = doc(db, 'lectures', lectureId);
    const docSnap = await getDoc(lectureRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Lecture;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching lecture ${lectureId}:`, error);
    // Specifically handle the case where Firestore backend is not found.
    if ((error as any)?.code === 'not-found') {
      console.error("Firestore database not found. Please ensure it's created in the Firebase console.");
    }
    return null;
  }
};
