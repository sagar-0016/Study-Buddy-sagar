
// To run this script:
// 1. Make sure you have tsx installed: npm install -g tsx
// 2. Upload the banner image to Firebase Storage and get its Download URL.
// 3. Paste the URL into the placeholder below.
// 4. Run from the root of your project: tsx ./scripts/populateHomepage.ts

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

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

// --- PASTE YOUR IMAGE URL HERE ---
const BANNER_IMAGE_URL = "PASTE_YOUR_FIREBASE_STORAGE_DOWNLOAD_URL_HERE";

const main = async () => {
    try {
        if (BANNER_IMAGE_URL === "PASTE_YOUR_FIREBASE_STORAGE_DOWNLOAD_URL_HERE") {
            console.error("\n❌ Please paste the Firebase Storage Download URL for the banner image in the script before running.");
            process.exit(1);
        }

        console.log("Starting to populate 'homepage' collection...");
        const homepageRef = doc(db, "homepage", "banner");
        
        await setDoc(homepageRef, {
            imageUrl: BANNER_IMAGE_URL
        });

        console.log(`\n✅ Successfully populated 'homepage' collection with the banner image URL in Firestore!`);
        console.log("\nYou can now close this script (Ctrl+C).");

    } catch (error) {
        console.error("\n❌ Error populating Firestore:", error);
        process.exit(1);
    }
}

main();
