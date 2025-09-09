
// To run this script:
// 1. Make sure you have tsx installed: npm install -g tsx
// 2. Run from the root of your project: tsx ./scripts/populateTechnicalHelp.ts

import { getFirestore, collection, writeBatch, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../src/lib/firebase';

console.log("Firebase initialized for script.");

const helpRequests = [
    {
        text: "The progress bar on the syllabus page isn't updating after I check off a topic. I have to refresh the page to see the change.",
        category: "UI/UX",
        isAddressed: true,
        isCleared: false,
        imageUrl: "https://placehold.co/600x400.png",
    },
    {
        text: "The app seems to be a bit slow when loading the dashboard page, especially the charts.",
        category: "Performance",
        isAddressed: false,
        isCleared: false,
        imageUrl: "",
    },
    {
        text: "I tried to upload a video in the lectures section but it failed. Is there a size limit?",
        category: "Functionality",
        isAddressed: true,
        isCleared: true,
        imageUrl: "",
    },
];

const main = async () => {
    try {
        console.log("Starting to populate 'technical-help' collection...");
        const batch = writeBatch(db);
        const helpRef = collection(db, "technical-help");

        helpRequests.forEach(request => {
            const docRef = doc(helpRef);
            batch.set(docRef, { ...request, createdAt: serverTimestamp()});
        });
        
        await batch.commit();

        console.log(`\n✅ Successfully populated 'technical-help' collection with ${helpRequests.length} new entries in Firestore!`);
        console.log("\nYou can now close this script (Ctrl+C).");

    } catch (error) {
        console.error("\n❌ Error populating Firestore:", error);
        process.exit(1);
    }
}

main();
