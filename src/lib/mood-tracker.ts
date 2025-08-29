
import { db } from './firebase';
import { collection, addDoc, serverTimestamp, query, orderBy, limit, getDocs, Timestamp } from 'firebase/firestore';

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

/**
 * Checks if the user has logged 'Worried' for a specific number of consecutive days.
 * @param {number} consecutiveDays - The number of consecutive days to check for.
 * @returns {Promise<boolean>} True if the condition is met, false otherwise.
 */
export const checkConsecutiveWorriedDays = async (consecutiveDays: number): Promise<boolean> => {
  try {
    const moodTrackerRef = collection(db, 'mood-tracker');
    const q = query(moodTrackerRef, orderBy('createdAt', 'desc'), limit(consecutiveDays));
    const querySnapshot = await getDocs(q);

    const logs = querySnapshot.docs.map(doc => doc.data() as { mood: string; createdAt: Timestamp });

    // Not enough logs to meet the streak
    if (logs.length < consecutiveDays) {
      return false;
    }

    // Check if all recent logs are 'Worried'
    if (logs.some(log => log.mood !== 'Worried')) {
      return false;
    }

    // Check if the logs are on consecutive, distinct days
    const uniqueDays = new Set<string>();
    for (const log of logs) {
        const logDate = log.createdAt.toDate();
        // Format as YYYY-MM-DD to count unique days
        const dayString = `${logDate.getFullYear()}-${logDate.getMonth() + 1}-${logDate.getDate()}`;
        uniqueDays.add(dayString);
    }
    
    // If the number of unique days is less than the required streak, it means
    // multiple 'Worried' logs happened on the same day, which doesn't count as a multi-day streak.
    return uniqueDays.size >= consecutiveDays;

  } catch (error) {
    console.error('Error checking for consecutive worried days:', error);
    return false; // Safely return false on error
  }
};
