
import { db } from './firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import type { FlashcardDeck } from './types';

type DeckCategory = 'main' | 'physics' | 'chemistry' | 'maths';

/**
 * Fetches all flashcard decks for a specific category from Firestore.
 * @param {DeckCategory} category - The category of decks to fetch.
 * @returns {Promise<FlashcardDeck[]>} An array of flashcard deck objects.
 */
export const getFlashcardDecks = async (category: DeckCategory): Promise<FlashcardDeck[]> => {
  try {
    const decksRef = collection(db, 'flashcardDecks');
    const q = query(decksRef, where('category', '==', category));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.warn(`No flashcard decks found for category: ${category}`);
      return [];
    }

    return querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as FlashcardDeck)
    );
  } catch (error) {
    console.error(`Error fetching flashcard decks for ${category}:`, error);
    return [];
  }
};
