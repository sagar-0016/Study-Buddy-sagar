
// To run this script:
// 1. Make sure you have tsx installed: npm install -g tsx
// 2. Run from the root of your project: tsx ./scripts/populateLectures.ts

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

const lectures = [
    // Test Video from GitHub
    {
        id: "github-test",
        title: "Test Video from GitHub",
        description: "A test video added to demonstrate the lecture library functionality with an external URL.",
        subject: "Physics", // Assigning to a subject for filtering
        videoUrl: "https://github.com/sagar-0016/Flashcards/raw/refs/heads/main/This%20one%20might%20take%20you%20some%20time%20%23sofimanassyan%20%23relatable%20%23funny%20%5BFkWzWPqPif0%5D.webm",
        thumbnailUrl: "https://placehold.co/1280x720.png",
        channel: "Test Channel",
        duration: "0:30",
        notes: [
            { name: "Sample PDF Notes", type: "pdf", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"},
            { name: "Related Wikipedia Article", type: "link", url: "https://en.wikipedia.org/wiki/Physics"}
        ]
    },
    // PASTE YOUR UPLOADED VIDEO URL HERE
    {
        id: "hair-tutorial",
        title: "Test Video: Hair Tutorial",
        description: "A test video added to demonstrate the lecture library functionality with user-uploaded content.",
        subject: "Chemistry", // Assigning to a subject for filtering
        videoUrl: "https://firebasestorage.googleapis.com/v0/b/study-buddy-7357a.appspot.com/o/I%20was%20SHAKING%20doing%20this%20%F0%9F%A5%B6%20%23hairstyle%20%23haircut%20%23hairtutorial%20%23shorts%20%23beauty%20%5B5qI0g3g2lOVGM%5D.webm?alt=media&token=c1371c13-4234-422f-b6cc-47132d4a7535",
        thumbnailUrl: "https://placehold.co/1280x720.png",
        channel: "Test Channel",
        duration: "0:30",
        notes: []
    }
];

const main = async () => {
    try {
        console.log("Starting to populate 'lectures' collection...");
        const batch = writeBatch(db);
        const lecturesRef = collection(db, "lectures");

        for (const lecture of lectures) {
            // Simple validation to ensure the placeholder is replaced
            if (lecture.videoUrl === "PASTE_THE_URL_FROM_FIREBASE_STORAGE_HERE") {
                console.warn(`\n⚠️ Skipping lecture "${lecture.title}" because the placeholder URL has not been replaced. Please edit scripts/populateLectures.ts.`);
                continue; 
            }

            const { id, notes, ...lectureData } = lecture;
            const lectureDocRef = doc(lecturesRef, id); // Use a predictable ID
            batch.set(lectureDocRef, lectureData);
            
            // Add nested notes if they exist
            if (notes && notes.length > 0) {
                const notesRef = collection(lectureDocRef, 'notes');
                notes.forEach(note => {
                    const noteDocRef = doc(notesRef); // Auto-generate ID for each note
                    batch.set(noteDocRef, note);
                });
                console.log(`-> Prepared ${notes.length} notes for lecture '${lecture.title}'.`);
            }
        }
        
        await batch.commit();

        console.log(`\n✅ Successfully populated 'lectures' collection in Firestore!`);
        console.log("\nYou can now close this script (Ctrl+C).");

    } catch (error) {
        console.error("\n❌ Error populating Firestore:", error);
        process.exit(1);
    }
}

main();
