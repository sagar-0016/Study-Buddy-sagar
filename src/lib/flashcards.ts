
import { db } from './firebase';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import type { FlashcardDeck, Flashcard } from './types';

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

/**
 * Fetches all flashcards for a specific deck from its nested 'cards' collection.
 * @param {string} deckId - The ID of the deck document.
 * @returns {Promise<Flashcard[]>} An array of flashcard objects.
 */
export const getFlashcardsForDeck = async (deckId: string): Promise<Flashcard[]> => {
    try {
        const cardsRef = collection(db, 'flashcardDecks', deckId, 'cards');
        const q = query(cardsRef, orderBy('__name__')); // Order by document ID to maintain some consistency
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            console.warn(`No cards found for deck: ${deckId}`);
            return [];
        }

        return querySnapshot.docs.map(doc => ({
            id: doc.id, // The document ID is the card ID
            question: doc.data().question,
            answer: doc.data().answer,
        } as Flashcard));
    } catch (error) {
        console.error(`Error fetching cards for deck ${deckId}:`, error);
        return [];
    }
}
