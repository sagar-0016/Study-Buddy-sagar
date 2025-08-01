
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
    // Test Video
    {
        title: "Test Video: Hair Tutorial",
        description: "A test video added to demonstrate the lecture library functionality with user-uploaded content.",
        subject: "Chemistry", // Assigning to a subject for filtering
        videoUrl: "https://firebasestorage.googleapis.com/v0/b/study-buddy-7357a.appspot.com/o/I%20was%20SHAKING%20doing%20this%20%F0%9F%A5%B6%20%23hairstyle%20%23haircut%20%23hairtutorial%20%23shorts%20%23beauty%20%5B5qI0g3lOVGM%5D.webm?alt=media",
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
            const docRef = doc(lecturesRef); // Create a new document reference
            batch.set(docRef, lecture);
        });
        
        await batch.commit();

        console.log(`\n✅ Successfully populated 'lectures' collection with ${lectures.length} videos in Firestore!`);
        console.log("\nYou can now close this script (Ctrl+C).");

    } catch (error) {
        console.error("\n❌ Error populating Firestore:", error);
        process.exit(1);
    }
}

main();
