
import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

/**
 * Logs the user's selected mood and the message shown to the 'mood-tracker' collection in Firestore.
 * @param {string} mood - The mood selected by the user (e.g., 'Motivated', 'Focused').
 * @param {string} [message] - The optional motivational message that was shown.
 * @returns {Promise<string>} The ID of the newly created log document.
 */
export const logMood = async (mood: string, message?: string): Promise<string> => {
  try {
    const moodTrackerRef = collection(db, 'mood-tracker');
    
    const logData: { mood: string; createdAt: any; message?: string } = {
      mood: mood,
      createdAt: serverTimestamp(),
    };

    if (message) {
      logData.message = message;
    }

    const newDocRef = await addDoc(moodTrackerRef, logData);
    return newDocRef.id;
  } catch (error) {
    console.error('Error logging mood:', error);
    throw error; // Re-throw the error to be handled by the caller if necessary
  }
};
