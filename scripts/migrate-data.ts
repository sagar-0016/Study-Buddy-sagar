
// To run this script:
// 1. Make sure you have tsx installed: npm install -g tsx
// 2. Run from the root of your project: npm run migrate-data

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, writeBatch } from 'firebase/firestore';

// --- Single Firebase Configuration ---
// This connects to your overall Firebase project.
const firebaseConfig = {
  apiKey: "AIzaSyBv26GpTGNi56cOHY23H4JWk_Q0iu7WRbg",
  authDomain: "study-buddy-7357a.firebaseapp.com",
  projectId: "study-buddy-7357a",
  storageBucket: "study-buddy-7357a.firebasestorage.app",
  messagingSenderId: "286721031921",
  appId: "1:286721031921:web:bdebedc76dd6081dbfb350"
};

// --- Initialize a single app ---
const app = initializeApp(firebaseConfig);

// --- Get explicit references to both databases ---
const sourceDb = getFirestore(app); // Connects to '(default)' database
const destDb = getFirestore(app, "sagar");   // Connects to 'sagar' database

const collectionsToMigrate = [
    'brainstorming',
    'brainstorming-submissions',
    'discipline',
    'features',
    'flashcardDecks', // Special handling for subcollections
    'lectures', // Special handling for subcollections
    'messages',
    'motivation-focused',
    'motivation-focused-formal',
    'motivation-motivated',
    'motivation-motivated-formal',
    'motivation-worried',
    'motivation-worried-formal',
    'one-liners',
    'questions',
    'revisions', // Special handling for subcollections
    'schedules',
    'syllabus',
    'technical-help',
    'threatening-messages',
    'tinkering-messages',
    'tips',
    'tricky-questions',
    'worried-messages'
];


async function migrateCollection(collectionName: string) {
    console.log(`\nMigrating collection: ${collectionName}...`);
    const sourceCollectionRef = collection(sourceDb, collectionName);
    const querySnapshot = await getDocs(sourceCollectionRef);

    if (querySnapshot.empty) {
        console.log(`  -> Collection '${collectionName}' is empty. Skipping.`);
        return;
    }

    const batch = writeBatch(destDb);
    let count = 0;

    for (const sourceDoc of querySnapshot.docs) {
        const destDocRef = doc(destDb, collectionName, sourceDoc.id);
        batch.set(destDocRef, sourceDoc.data());
        count++;

        // Special handling for nested collections
        if (collectionName === 'flashcardDecks') {
            await migrateSubcollection(sourceDoc.id, 'cards', collectionName);
        }
        if (collectionName === 'lectures') {
            await migrateSubcollection(sourceDoc.id, 'notes', collectionName);
            await migrateSubcollection(sourceDoc.id, 'doubts', collectionName);
            await migrateSubcollection(sourceDoc.id, 'feedback', collectionName);
        }
         if (collectionName === 'revisions' && sourceDoc.id !== 'reset') {
            await migrateSubcollection(sourceDoc.id, 'recall-history', collectionName);
        }
    }

    await batch.commit();
    console.log(`  -> ✅ Migrated ${count} documents from '${collectionName}'.`);
}

async function migrateSubcollection(parentId: string, subcollectionName: string, parentCollectionName: string) {
    const sourceSubRef = collection(sourceDb, parentCollectionName, parentId, subcollectionName);
    const subQuerySnapshot = await getDocs(sourceSubRef);

    if (subQuerySnapshot.empty) {
        return; // No subcollection to migrate
    }

    const batch = writeBatch(destDb);
    let count = 0;

    subQuerySnapshot.forEach(subDoc => {
        const destSubDocRef = doc(destDb, parentCollectionName, parentId, subcollectionName, subDoc.id);
        batch.set(destSubDocRef, subDoc.data());
        count++;
    });

    await batch.commit();
    console.log(`    -> Migrated ${count} subcollection documents from '${subcollectionName}' in doc '${parentId}'.`);
}


async function main() {
    console.log("🚀 Starting data migration from source (default) to destination (sagar)...");
    
    // The `doubts` collection in the source project is nested under lectures.
    // The migration logic for `lectures` already handles this. We only need
    // to migrate the top-level collections.
    const topLevelCollections = collectionsToMigrate.filter(c => c !== 'doubts');

    for (const collectionName of topLevelCollections) {
        try {
            await migrateCollection(collectionName);
        } catch (error) {
            console.error(`❌ Failed to migrate collection '${collectionName}':`, error);
        }
    }

    console.log("\n\n✅✅✅ Data migration complete! ✅✅✅");
    console.log("Your new 'sagar' database should now be populated.");
    console.log("You can now close this script (Ctrl+C).");
}

main().catch(err => {
    console.error("\n\n❌ A critical error occurred during migration:", err);
    process.exit(1);
});
