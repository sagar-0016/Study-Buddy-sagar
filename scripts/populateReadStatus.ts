
// To run this script:
// 1. Make sure you have tsx installed: npm install -g tsx
// 2. Run from the root of your project: tsx ./scripts/populateReadStatus.ts

import { collection, writeBatch, getDocs } from 'firebase/firestore';
import { db } from '../src/lib/firebase';

console.log("Firebase initialized for script.");

const collectionsToUpdate = [
    'motivation-motivated',
    'motivation-focused',
    'motivation-worried',
    'motivation-motivated-formal',
    'motivation-focused-formal',
    'motivation-worried-formal',
];

const main = async () => {
    try {
        console.log("Starting to backfill 'read' status on motivation collections...");
        const batch = writeBatch(db);
        let updatedCount = 0;

        for (const collectionName of collectionsToUpdate) {
            const collectionRef = collection(db, collectionName);
            const querySnapshot = await getDocs(collectionRef);

            if (querySnapshot.empty) {
                console.log(`- Collection '${collectionName}' is empty. Skipping.`);
                continue;
            }

            querySnapshot.forEach(doc => {
                // Check if the 'read' field already exists to avoid unnecessary writes
                if (doc.data().read === undefined) {
                    batch.update(doc.ref, { read: false });
                    updatedCount++;
                }
            });
            console.log(`- Prepared ${querySnapshot.size} documents in '${collectionName}' for update.`);
        }

        if (updatedCount > 0) {
            await batch.commit();
            console.log(`\n✅ Successfully added 'read: false' to ${updatedCount} documents across ${collectionsToUpdate.length} collections!`);
        } else {
            console.log("\n✅ All documents already have the 'read' field. No updates were needed.");
        }
        
        console.log("\nYou can now close this script (Ctrl+C).");

    } catch (error) {
        console.error("\n❌ Error populating Firestore:", error);
        process.exit(1);
    }
}

main();
