
// To run this script:
// 1. Make sure you have tsx installed: npm install -g tsx
// 2. Run from the root of your project: tsx ./scripts/populateOneLiners.ts

import { collection, writeBatch, doc } from 'firebase/firestore';
import { db } from '../src/lib/firebase';

console.log("Firebase initialized for script.");

const oneLiners = [
    { text: "Your journey to IIT Delhi starts now. Seize the day!" },
    { text: "Every problem solved is a step closer to your dream." },
    { text: "Consistency is the key that unlocks potential." },
    { text: "The harder you work, the luckier you get." },
    { text: "Believe you can and you're halfway there." },
];

const main = async () => {
    try {
        console.log("Starting to populate 'one-liners' collection...");
        const batch = writeBatch(db);
        const oneLinersRef = collection(db, "one-liners");

        oneLiners.forEach(liner => {
            const docRef = doc(oneLinersRef);
            batch.set(docRef, liner);
        });
        
        await batch.commit();

        console.log(`\n✅ Successfully populated 'one-liners' collection with ${oneLiners.length} new entries in Firestore!`);
        console.log("\nYou can now close this script (Ctrl+C).");

    } catch (error) {
        console.error("\n❌ Error populating Firestore:", error);
        process.exit(1);
    }
}

main();
