
// To run this script:
// 1. Make sure you have tsx installed: npm install -g tsx
// 2. Run from the root of your project: tsx ./scripts/populateFlashcards.ts

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, writeBatch, doc, getDocs, query, where, deleteDoc } from 'firebase/firestore';
import { gocFlashcards } from '../src/lib/flashcards/goc';
import { kinematicsFlashcards } from '../src/lib/flashcards/kinematics';
import { forcesFlashcards } from '../src/lib/flashcards/forces';

// IMPORTANT: Paste your Firebase config here
const firebaseConfig = {
  apiKey: "AIzaSyBv26GpTGNi56cOHY23H4JWk_Q0iu7WRbg",
  authDomain: "study-buddy-7357a.firebaseapp.com",
  projectId: "study-buddy-7357a",
  storageBucket: "study-buddy-7357a.appspot.com",
  messagingSenderId: "286721031921",
  appId: "1:286721031921:web:bdebedc76dd6081dbfb350"
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
        const decksRef = collection(db, "flashcardDecks");
        
        // --- 1. Cleanup Phase ---
        console.log("Starting cleanup of old 'available' sub-decks...");
        const q = query(decksRef, where("status", "==", "available"));
        const querySnapshot = await getDocs(q);
        
        const decksToDelete = querySnapshot.docs.filter(doc => doc.data().category !== 'main');

        if (decksToDelete.length > 0) {
            const deleteBatch = writeBatch(db);
            decksToDelete.forEach(doc => {
                console.log(` -> Marking deck for deletion: ${doc.id}`);
                deleteBatch.delete(doc.ref);
            });
            await deleteBatch.commit();
            console.log(`✅ Successfully deleted ${decksToDelete.length} old deck documents.`);
        } else {
            console.log("No old decks to clean up.");
        }
        
        // --- 2. Repopulation Phase ---
        console.log("\nStarting to populate new flashcard decks...");
        const populateBatch = writeBatch(db);

        decksToPopulate.forEach(deck => {
            const { id, data, ...deckData } = deck;
            const docRef = doc(decksRef, id);
            
            // Set the deck metadata (title, description, etc.)
            populateBatch.set(docRef, deckData);
            console.log(`-> Prepared deck metadata for '${id}'.`);

            // Populate the nested 'cards' sub-collection
            const cardsRef = collection(docRef, 'cards');
            let cardIdCounter = 1;
            data.forEach(card => {
                const cardDoc = doc(cardsRef, cardIdCounter.toString());
                populateBatch.set(cardDoc, { question: card.question, answer: card.answer });
                cardIdCounter++;
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
