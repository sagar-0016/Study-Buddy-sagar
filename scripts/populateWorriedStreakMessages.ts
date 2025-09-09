
// To run this script:
// 1. Make sure you have tsx installed: npm install -g tsx
// 2. Run from the root of your project: tsx ./scripts/populateWorriedMessages.ts

import { collection, writeBatch, doc } from 'firebase/firestore';
import { db } from '../src/lib/firebase';

console.log("Firebase initialized for script.");

const worriedStreakMessages = [
    { message: "I've noticed you've been feeling worried for a few days. Remember, it's okay to not be okay. Your feelings are valid, and it's brave to acknowledge them. Maybe take a slightly longer break today?" },
    { message: "Hey, it seems like worry has been a constant companion lately. This journey is tough, and you are tougher. Don't let these feelings overshadow the progress you've made. I'm here for you." },
    { message: "This is the third day you've felt worried. Let's try something different. Close your eyes, take five deep breaths, and think of one small thing you're proud of. Just one. You've earned that moment of peace." },
    { message: "Seeing you worried for several days concerns me. Please remember that your well-being is the most important thing. Is there a topic that's causing this? Maybe we can break it down into smaller, less intimidating pieces together." },
    { message: "It's completely normal to have a stretch of difficult days. The path to success isn't a straight line. Be gentle with yourself. You are doing your best, and that is more than enough." }
];

const main = async () => {
    try {
        console.log("Starting to populate 'worried-messages' collection...");
        const batch = writeBatch(db);
        const messagesRef = collection(db, "worried-messages");

        worriedStreakMessages.forEach(msg => {
            const docRef = doc(messagesRef);
            batch.set(docRef, msg);
        });
        
        await batch.commit();

        console.log(`\n✅ Successfully populated 'worried-messages' collection with ${worriedStreakMessages.length} new entries in Firestore!`);
        console.log("\nYou can now close this script (Ctrl+C).");

    } catch (error) {
        console.error("\n❌ Error populating Firestore:", error);
        process.exit(1);
    }
}

main();
