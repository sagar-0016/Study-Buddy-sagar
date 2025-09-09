
// To run this script:
// 1. Make sure you have tsx installed: npm install -g tsx
// 2. Run from the root of your project: tsx ./scripts/populateThreateningMessages.ts

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, writeBatch, doc } from 'firebase/firestore';

// IMPORTANT: Paste your Firebase config here
const firebaseConfig = {
  apiKey: "AIzaSyDnzakdcRW6cwvgB4Hmc9qp5_mAJQ7fjm0",
  authDomain: "share-aa50c.firebaseapp.com",
  projectId: "share-aa50c",
  storageBucket: "share-aa50c.appspot.com",
  messagingSenderId: "196681616928",
  appId: "1:196681616928:web:6b8b539cbe955549d37645"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("Firebase initialized for script.");

const threateningMessages = [
    { message: "Okay, that's enough. If you click again, I'm hiding your physics notes. Get back to work." },
    { message: "This is your final warning. Stop messing around or I'll replace your schedule with 12 hours of just Inorganic Chemistry." },
    { message: "Don't make me do it. I have the ability to reset all your syllabus progress. Now, go solve some PYQs." },
    { message: "I'm not kidding. The next click will log you out and you'll have to re-verify the device. Is that what you want?" },
    { message: "You're playing a dangerous game. Focus now, or I'll tell Saurabh you're not studying." }
];

const main = async () => {
    try {
        console.log("Starting to populate 'threatening-messages' collection...");
        const batch = writeBatch(db);
        const messagesRef = collection(db, "threatening-messages");

        threateningMessages.forEach(msg => {
            const docRef = doc(messagesRef);
            batch.set(docRef, msg);
        });
        
        await batch.commit();

        console.log(`\n✅ Successfully populated 'threatening-messages' collection with ${threateningMessages.length} new entries in Firestore!`);
        console.log("\nYou can now close this script (Ctrl+C).");

    } catch (error) {
        console.error("\n❌ Error populating Firestore:", error);
        process.exit(1);
    }
}

main();
