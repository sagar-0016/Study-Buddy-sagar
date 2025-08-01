
import { db } from './firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import type { BrainstormingTopic } from './types';

/**
 * Fetches all brainstorming topics from Firestore, ordered by subject.
 * @returns {Promise<BrainstormingTopic[]>} An array of brainstorming topic objects.
 */
export const getBrainstormingTopics = async (): Promise<BrainstormingTopic[]> => {
  try {
    const brainstormingRef = collection(db, 'brainstorming');
    const q = query(brainstormingRef, orderBy('subject'));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return [];
    }

    return querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as BrainstormingTopic)
    );
  } catch (error) {
    console.error('Error fetching brainstorming topics:', error);
    return [];
  }
};
