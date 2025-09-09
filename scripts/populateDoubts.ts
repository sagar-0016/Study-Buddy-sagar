
// To run this script:
// 1. Make sure you have tsx installed: npm install -g tsx
// 2. Run from the root of your project: tsx ./scripts/populateDoubts.ts

import { getFirestore, collection, writeBatch, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../src/lib/firebase';


console.log("Firebase initialized for script.");

const doubts = [
    {
        text: "In the VSEPR theory for SF4, why is the lone pair placed on the equatorial position instead of the axial position in the see-saw geometry? I thought axial positions have more space.",
        subject: "Chemistry",
        isAddressed: true,
        isCleared: false,
        imageUrl: "https://placehold.co/600x400.png",
    },
    {
        text: "I'm confused about the direction of friction in rolling motion. Does it always oppose the motion of the center of mass?",
        subject: "Physics",
        isAddressed: false,
        isCleared: false,
        imageUrl: "",
    },
    {
        text: "How do you determine the number of non-negative integral solutions for an equation like x + y + z = 10? I keep forgetting the 'stars and bars' formula.",
        subject: "Maths",
        isAddressed: true,
        isCleared: true,
        imageUrl: "",
    },
];

const main = async () => {
    try {
        console.log("Starting to populate 'doubts' collection...");
        const batch = writeBatch(db);
        const doubtsRef = collection(db, "doubts");

        doubts.forEach(doubt => {
            const docRef = doc(doubtsRef);
            batch.set(docRef, { ...doubt, createdAt: serverTimestamp()});
        });
        
        await batch.commit();

        console.log(`\n✅ Successfully populated 'doubts' collection with ${doubts.length} new entries in Firestore!`);
        console.log("\nYou can now close this script (Ctrl+C).");

    } catch (error) {
        console.error("\n❌ Error populating Firestore:", error);
        process.exit(1);
    }
}

main();
