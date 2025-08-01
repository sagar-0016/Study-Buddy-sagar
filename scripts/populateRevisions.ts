
// To run this script:
// 1. Make sure you have tsx installed: npm install -g tsx
// 2. Run from the root of your project: tsx ./scripts/populateRevisions.ts

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

// IMPORTANT: Paste your Firebase config here
const firebaseConfig = {
  apiKey: "AIzaSyBv26GpTGNi56cOHY23H4JWk_Q0iu7WRbg",
  authDomain: "study-buddy-7357a.firebaseapp.com",
  projectId: "study-buddy-7357a",
  storageBucket: "study-buddy-7357a.firebasestorage.app",
  messagingSenderId: "286721031921",
  appId: "1:286721031921:web:bdebedc76dd6081dbfb350"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("Firebase initialized for script.");

const revisionTopics = [
    {
        subject: "Physics",
        chapterName: "Rotational Motion",
        topicName: "Moment of Inertia of a Solid Sphere",
        hints: "Formula involves M and R. It's a fraction. Think about the standard formula.",
        recallSuccess: 0,
        recallFails: 0,
    },
    {
        subject: "Chemistry",
        chapterName: "Chemical Bonding",
        topicName: "VSEPR Theory Postulates",
        hints: "Electron pairs repel each other. Lone pairs repel more than bond pairs. Geometry vs. Shape.",
        recallSuccess: 0,
        recallFails: 0,
    }
];

const main = async () => {
    try {
        console.log("Starting to populate 'revisions' collection...");
        const batch: Promise<any>[] = [];
        const revisionsRef = collection(db, "revisions");

        revisionTopics.forEach(topic => {
            batch.push(addDoc(revisionsRef, {
                ...topic,
                lastReviewed: serverTimestamp()
            }));
        });
        
        await Promise.all(batch);

        console.log("\n✅ Successfully populated 'revisions' collection in Firestore!");
        console.log("\nYou can now close this script (Ctrl+C).");

    } catch (error) {
        console.error("\n❌ Error populating Firestore:", error);
        process.exit(1);
    }
}

main();
