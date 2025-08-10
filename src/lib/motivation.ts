
import { db } from './firebase';
import { collection, getDocs, query, limit } from 'firebase/firestore';

/**
 * Fetches a random motivational message from a specified collection.
 * @param mood - The mood to fetch a message for (e.g., 'motivated', 'focused', 'worried').
 * @returns A random message string from the collection.
 */
export const getRandomMotivationByMood = async (mood: string): Promise<string> => {
    const collectionName = `motivation-${mood.toLowerCase()}`;
    return getRandomMessageFromCollection(collectionName, "You've got this, one step at a time!");
};

/**
 * Fetches a random message from the 'tinkering-messages' collection.
 * @returns A random message string.
 */
export const getTinkeringMessage = async (): Promise<string> => {
    return getRandomMessageFromCollection('tinkering-messages', "Are you sure you're focusing on what's important right now?");
};

/**
 * Fetches a random message from the 'threatening-messages' collection.
 * @returns A random message string.
 */
export const getThreateningMessage = async (): Promise<string> => {
    return getRandomMessageFromCollection('threatening-messages', "Okay, that's enough. Get back to work.");
};


/**
 * A generic helper function to fetch a random message from any given collection.
 * @param collectionName - The name of the Firestore collection.
 * @param defaultMessage - A fallback message if the collection is empty or an error occurs.
 * @returns A random message string.
 */
const getRandomMessageFromCollection = async (collectionName: string, defaultMessage: string): Promise<string> => {
    try {
        const messagesRef = collection(db, collectionName);
        const q = query(messagesRef, limit(50));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            console.warn(`Firestore collection '${collectionName}' is empty or does not exist.`);
            return defaultMessage;
        }

        const messages = querySnapshot.docs.map(doc => doc.data().message as string);
        const randomIndex = Math.floor(Math.random() * messages.length);
        return messages[randomIndex] || defaultMessage;
    } catch (error) {
        console.error(`Error fetching from ${collectionName}:`, error);
        return defaultMessage;
    }
}
