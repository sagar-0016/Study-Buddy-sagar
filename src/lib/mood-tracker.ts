
import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

/**
 * Logs the user's selected mood to the 'mood-tracker' collection in Firestore.
 * @param {string} mood - The mood selected by the user (e.g., 'Motivated', 'Focused').
 * @returns {Promise<string>} The ID of the newly created log document.
 */
export const logMood = async (mood: string): Promise<string> => {
  try {
    const moodTrackerRef = collection(db, 'mood-tracker');
    const newDocRef = await addDoc(moodTrackerRef, {
      mood: mood,
      createdAt: serverTimestamp(),
    });
    return newDocRef.id;
  } catch (error) {
    console.error('Error logging mood:', error);
    throw error; // Re-throw the error to be handled by the caller if necessary
  }
};
