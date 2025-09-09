
// To run this script:
// 1. Make sure you have tsx installed: npm install -g tsx
// 2. Run from the root of your project: npm run migrate-data

import { collection, getDocs, doc, writeBatch } from 'firebase/firestore';
import { db as destDb } from '../src/lib/firebase'; // Destination is the main 'sagar' db
import { sourceDb } from '../src/lib/firebase-source'; // Source is the '(default)' db

const collectionsToMigrate = [
    'brainstorming',
    'brainstorming-submissions',
    'discipline',
    'doubts',
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
    
    for (const collectionName of collectionsToMigrate) {
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
