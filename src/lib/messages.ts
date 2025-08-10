
import { db } from './firebase';
import {
  collection,
  doc,
  getDocs,
  updateDoc,
  query,
  where,
  orderBy,
} from 'firebase/firestore';
import type { Message } from './types';


/**
 * Fetches all unread messages from Firestore, ordered by creation date.
 * @returns {Promise<Message[]>} An array of message objects.
 */
export const getUnreadMessages = async (): Promise<Message[]> => {
  try {
    const messagesRef = collection(db, 'messages');
    const q = query(
        messagesRef, 
        where('isRead', '==', false), 
        orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Message)
    );
  } catch (error) {
    console.error('Error fetching unread messages:', error);
    return [];
  }
};

/**
 * Marks a message as read.
 * @param {string} messageId - The ID of the message document to update.
 */
export const markMessageAsRead = async (messageId: string): Promise<void> => {
    try {
        const messageRef = doc(db, 'messages', messageId);
        await updateDoc(messageRef, {
            isRead: true,
        });
    } catch (error) {
        console.error(`Error marking message ${messageId} as read:`, error);
        throw error;
    }
}
