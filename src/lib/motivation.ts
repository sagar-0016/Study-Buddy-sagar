
import { db } from './firebase';
import { collection, getDocs, query, limit, where, writeBatch, doc, updateDoc } from 'firebase/firestore';

type MotivationMessage = {
    id: string;
    text: string;
    collectionName: string;
}

/**
 * Marks a specific motivational message as read.
 * @param collectionName - The name of the collection the message belongs to.
 * @param messageId - The ID of the message document.
 */
export const markMotivationAsRead = async (collectionName: string, messageId: string): Promise<void> => {
    try {
        const messageRef = doc(db, collectionName, messageId);
        await updateDoc(messageRef, {
            read: true
        });
    } catch (error) {
        console.error(`Error marking message ${messageId} as read in ${collectionName}:`, error);
        // We don't throw here to avoid breaking the user-facing flow for a background task.
    }
}


/**
 * Fetches a random motivational message from a specified collection based on mood and access level.
 * It prioritizes unread messages and resets them if all are read.
 * @param mood - The mood to fetch a message for (e.g., 'motivated', 'focused', 'worried').
 * @param accessLevel - The user's access level, which determines the message collection.
 * @returns A random message object from the collection, including its ID and collection name.
 */
export const getRandomMotivationByMood = async (
  mood: string,
  accessLevel: 'full' | 'limited' = 'full'
): Promise<MotivationMessage> => {
    const moodLower = mood.toLowerCase();
    const suffix = accessLevel === 'limited' ? '-formal' : '';
    const collectionName = `motivation-${moodLower}${suffix}`;
    
    const defaultMessages: { [key: string]: string } = {
        motivated: "You've got this, one step at a time!",
        focused: "Keep up the great work.",
        worried: "It's okay to feel this way. Take a deep breath."
    };
    
    const fallbackText = defaultMessages[moodLower] || "Keep pushing forward.";
    const fallbackMessage: MotivationMessage = {
        id: 'fallback',
        text: fallbackText,
        collectionName: ''
    };

    try {
        const messagesRef = collection(db, collectionName);
        
        // Query for unread messages first
        const unreadQuery = query(messagesRef, where('read', '!=', true));
        let querySnapshot = await getDocs(unreadQuery);

        // If no unread messages, reset all and re-fetch
        if (querySnapshot.empty) {
            const allDocsSnapshot = await getDocs(messagesRef);
            if(allDocsSnapshot.empty) return fallbackMessage;

            const batch = writeBatch(db);
            allDocsSnapshot.docs.forEach(doc => {
                batch.update(doc.ref, { read: false });
            });
            await batch.commit();
            console.log(`Reset read status for all messages in ${collectionName}.`);

            // Re-fetch after resetting
            querySnapshot = await getDocs(messagesRef);
        }

        const messages = querySnapshot.docs.map(doc => ({ 
            id: doc.id, 
            text: doc.data().message as string,
            collectionName: collectionName
        }));

        if (messages.length === 0) return fallbackMessage;

        const randomIndex = Math.floor(Math.random() * messages.length);
        return messages[randomIndex];

    } catch (error) {
        console.error(`Error fetching from ${collectionName}:`, error);
        return fallbackMessage;
    }
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
 * This one does not use the read/unread logic.
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
