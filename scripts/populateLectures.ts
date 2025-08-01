
// To run this script:
// 1. Make sure you have tsx installed: npm install -g tsx
// 2. Run from the root of your project: tsx ./scripts/populateLectures.ts

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, writeBatch, doc } from 'firebase/firestore';

// IMPORTANT: Paste your Firebase config here
const firebaseConfig = {
  apiKey: "AIzaSyBv26GpTGNi56cOHY23H4JWk_Q0iu7WRbg",
  authDomain: "study-buddy-7357a.firebaseapp.com",
  projectId: "study-buddy-7357a",
  storageBucket: "study-buddy-7357a.appspot.com",
  messagingSenderId: "286721031921",
  appId: "1:286721031921:web:bdebedc76dd6081dbfb350"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("Firebase initialized for script.");

const lectures = [
    // Test Video from GitHub
    {
        title: "Test Video from GitHub",
        description: "A test video added to demonstrate the lecture library functionality with an external URL.",
        subject: "Physics", // Assigning to a subject for filtering
        videoUrl: "https://github.com/sagar-0016/Flashcards/raw/refs/heads/main/This%20one%20might%20take%20you%20some%20time%20%23sofimanassyan%20%23relatable%20%23funny%20%5BFkWzWPqPif0%5D.webm",
        thumbnailUrl: "https://placehold.co/1280x720.png",
        channel: "Test Channel",
        duration: "0:30"
    },
    // PASTE YOUR UPLOADED VIDEO URL HERE
    {
        title: "Test Video: Hair Tutorial",
        description: "A test video added to demonstrate the lecture library functionality with user-uploaded content.",
        subject: "Chemistry", // Assigning to a subject for filtering
        videoUrl: "PASTE_THE_URL_FROM_FIREBASE_STORAGE_HERE",
        thumbnailUrl: "https://placehold.co/1280x720.png",
        channel: "Test Channel",
        duration: "0:30"
    }
];

const main = async () => {
    try {
        console.log("Starting to populate 'lectures' collection...");
        const batch = writeBatch(db);
        const lecturesRef = collection(db, "lectures");

        lectures.forEach(lecture => {
            // Simple validation to ensure the placeholder is replaced
            if (lecture.videoUrl === "PASTE_THE_URL_FROM_FIREBASE_STORAGE_HERE") {
                console.warn(`\n⚠️ Skipping lecture "${lecture.title}" because the placeholder URL has not been replaced. Please edit scripts/populateLectures.ts.`);
                return; // Skip this entry
            }
            const docRef = doc(lecturesRef); // Create a new document reference
            batch.set(docRef, lecture);
        });
        
        await batch.commit();

        console.log(`\n✅ Successfully populated 'lectures' collection in Firestore!`);
        console.log("\nYou can now close this script (Ctrl+C).");

    } catch (error) {
        console.error("\n❌ Error populating Firestore:", error);
        process.exit(1);
    }
}

main();
