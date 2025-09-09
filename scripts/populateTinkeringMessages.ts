
// To run this script:
// 1. Make sure you have tsx installed: npm install -g tsx
// 2. Run from the root of your project: tsx ./scripts/populateTinkeringMessages.ts

import { getFirestore, collection, writeBatch, doc } from 'firebase/firestore';
import { db } from '../src/lib/firebase';

console.log("Firebase initialized for script.");

const tinkeringMessages = [
    { message: "Are you trying to find a secret message? The real secret is in your textbook. Go find it!" },
    { message: "Hey, are you feeling okay? This isn't a game. Let's focus on the actual goal." },
    { message: "I see you're clicking a lot. Is your mouse okay, or are you just avoiding that tricky chapter?" },
    { message: "Remember, the goal is to conquer JEE, not to test the limits of this button. Let's get back to it." },
    { message: "This is fun, but you know what's more fun? Solving a problem you've been stuck on. Give it a try." }
];

const main = async () => {
    try {
        console.log("Starting to populate 'tinkering-messages' collection...");
        const batch = writeBatch(db);
        const messagesRef = collection(db, "tinkering-messages");

        tinkeringMessages.forEach(msg => {
            const docRef = doc(messagesRef);
            batch.set(docRef, msg);
        });
        
        await batch.commit();

        console.log(`\n✅ Successfully populated 'tinkering-messages' collection with ${tinkeringMessages.length} new entries in Firestore!`);
        console.log("\nYou can now close this script (Ctrl+C).");

    } catch (error) {
        console.error("\n❌ Error populating Firestore:", error);
        process.exit(1);
    }
}

main();
