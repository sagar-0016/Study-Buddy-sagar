
import { db } from './firebase';
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore';
import type { RevisionTopic } from './types';

/**
 * Fetches all revision topics from Firestore, ordered by last reviewed time.
 * @returns {Promise<RevisionTopic[]>} An array of revision topics.
 */
export const getRevisionTopics = async (): Promise<RevisionTopic[]> => {
  try {
    const revisionsRef = collection(db, 'revisions');
    // We can add more complex ordering later (e.g., by recall success/fail ratio)
    const q = query(revisionsRef, orderBy('lastReviewed', 'asc'));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as RevisionTopic)
    );
  } catch (error) {
    console.error('Error fetching revision topics:', error);
    return [];
  }
};

/**
 * Adds a new revision topic to Firestore.
 * @param {Omit<RevisionTopic, 'id' | 'lastReviewed' | 'recallSuccess' | 'recallFails'>} topicData - The data for the new topic.
 * @returns {Promise<string | null>} The ID of the newly created document, or null on failure.
 */
export const addRevisionTopic = async (topicData: {
  subject: string;
  chapterName: string;
  topicName: string;
  hints: string;
}): Promise<string | null> => {
  try {
    const revisionsRef = collection(db, 'revisions');
    const newDocRef = await addDoc(revisionsRef, {
      ...topicData,
      recallSuccess: 0,
      recallFails: 0,
      lastReviewed: serverTimestamp(),
    });
    return newDocRef.id;
  } catch (error) {
    console.error('Error adding revision topic:', error);
    return null;
  }
};

/**
 * Updates the recall stats for a specific revision topic.
 * @param {string} topicId - The ID of the topic document to update.
 * @param {'success' | 'fail'} result - The outcome of the recall attempt.
 */
export const updateRecallStats = async (
  topicId: string,
  result: 'success' | 'fail'
): Promise<void> => {
    // This will be implemented in the next step.
};
