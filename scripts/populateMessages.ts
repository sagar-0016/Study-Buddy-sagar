
// To run this script:
// 1. Make sure you have tsx installed: npm install -g tsx
// 2. Run from the root of your project: tsx ./scripts/populateMessages.ts

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, writeBatch, doc, serverTimestamp } from 'firebase/firestore';

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

const messages = [
    {
        text: "Don't forget to review the Rotational Motion chapter today. It's a high-priority topic!",
        isRead: false,
    },
    {
        text: "A new set of tricky questions for Chemistry has been added. Check them out!",
        isRead: false,
    },
    {
        text: "Make sure to take a break and stretch. Your well-being is as important as your studies.",
        isRead: true, // This one won't be shown as a pop-up
    },
];

const main = async () => {
    try {
        console.log("Starting to populate 'messages' collection...");
        const batch = writeBatch(db);
        const messagesRef = collection(db, "messages");

        messages.forEach(msg => {
            const docRef = doc(messagesRef);
            batch.set(docRef, { ...msg, createdAt: serverTimestamp()});
        });
        
        await batch.commit();

        console.log(`\n✅ Successfully populated 'messages' collection with ${messages.length} new entries in Firestore!`);
        console.log("\nYou can now close this script (Ctrl+C).");

    } catch (error) {
        console.error("\n❌ Error populating Firestore:", error);
        process.exit(1);
    }
}

main();
