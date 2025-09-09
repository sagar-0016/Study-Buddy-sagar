
// To run this script:
// 1. Make sure you have tsx installed: npm install -g tsx
// 2. Run from the root of your project: tsx ./scripts/populateFlashcards.ts

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, writeBatch, doc } from 'firebase/firestore';
import { gocFlashcards } from '../src/lib/flashcards/goc';
import { kinematicsFlashcards } from '../src/lib/flashcards/kinematics';
import { forcesFlashcards } from '../src/lib/flashcards/forces';

// IMPORTANT: Paste your Firebase config here
const firebaseConfig = {
  apiKey: "AIzaSyDnzakdcRW6cwvgB4Hmc9qp5_mAJQ7fjm0",
  authDomain: "share-aa50c.firebaseapp.com",
  projectId: "share-aa50c",
  storageBucket: "share-aa50c.appspot.com",
  messagingSenderId: "196681616928",
  appId: "1:196681616928:web:6b8b539cbe955549d37645"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("Firebase initialized for script.");

// --- Decks to be created/re-populated ---
const decksToPopulate = [
    {
        id: 'kinematics',
        category: 'physics',
        title: 'Kinematics',
        description: 'Study motion, including displacement, velocity, and acceleration, without considering its causes.',
        icon: 'Wind',
        status: 'available',
        difficulty: 'Basic',
        href: '/flashcards/physics/kinematics',
        data: kinematicsFlashcards,
    },
    {
        id: 'forces',
        category: 'physics',
        title: "Forces, Newton's Laws & Friction",
        description: 'Understand the fundamental principles governing motion and the forces that resist it.',
        icon: 'Orbit',
        status: 'available',
        difficulty: 'Intermediate',
        href: '/flashcards/physics/forces',
        data: forcesFlashcards,
    },
    {
        id: 'goc',
        category: 'chemistry',
        title: 'General Organic Chemistry (GOC)',
        description: 'Master the fundamental concepts that govern organic reactions and structures.',
        icon: 'Combine',
        status: 'available',
        difficulty: 'Advanced',
        href: '/flashcards/chemistry/goc',
        data: gocFlashcards,
    },
];


const main = async () => {
    try {
        console.log("\nStarting to populate new flashcard decks...");
        const populateBatch = writeBatch(db);
        const decksRef = collection(db, "flashcardDecks");

        decksToPopulate.forEach(deck => {
            const { id, data, ...deckData } = deck;
            const docRef = doc(decksRef, id);
            
            // Set the deck metadata (title, description, etc.)
            populateBatch.set(docRef, deckData);
            console.log(`-> Prepared deck metadata for '${id}'.`);

            // Populate the nested 'cards' sub-collection with auto-generated IDs
            const cardsRef = collection(docRef, 'cards');
            data.forEach(card => {
                const cardDoc = doc(cardsRef); // Firestore generates the ID
                populateBatch.set(cardDoc, { question: card.question, answer: card.answer });
            });
            console.log(`-> Prepared ${data.length} cards for the '${id}' deck.`);
        });

        await populateBatch.commit();

        console.log(`\n✅ Successfully created/updated ${decksToPopulate.length} decks and populated their cards.`);
        console.log("\nYou can now close this script (Ctrl+C).");

    } catch (error) {
        console.error("\n❌ Error populating Firestore:", error);
        process.exit(1);
    }
}

main();
