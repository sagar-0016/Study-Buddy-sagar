
import { db } from './firebase';
import { collection, getDocs, query, limit } from 'firebase/firestore';

/**
 * Fetches a random motivational message from a specified collection.
 * @param mood - The mood to fetch a message for (e.g., 'motivated', 'focused', 'worried').
 * @returns A random message string from the collection.
 */
export const getRandomMotivationByMood = async (mood: string): Promise<string> => {
    const collectionName = `motivation-${mood.toLowerCase()}`;
    try {
        const messagesRef = collection(db, collectionName);
        const q = query(messagesRef, limit(50)); // Fetch up to 50 messages to choose from
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return "You've got this, one step at a time!";
        }

        const messages = querySnapshot.docs.map(doc => doc.data().message as string);
        const randomIndex = Math.floor(Math.random() * messages.length);
        return messages[randomIndex] || "Keep pushing forward!";
    } catch (error) {
        console.error(`Error fetching from ${collectionName}:`, error);
        return "Every effort you make is a step toward your goal.";
    }
};
