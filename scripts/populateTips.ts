
// To run this script:
// 1. Make sure you have tsx installed: npm install -g tsx
// 2. Run from the root of your project: tsx ./scripts/populateTips.ts

import { collection, writeBatch, doc } from 'firebase/firestore';
import { db } from '../src/lib/firebase';

console.log("Firebase initialized for script.");

const tips = [
    { text: "When studying Physics, always draw a diagram. It helps visualize the problem and identify the forces at play." },
    { text: "For Organic Chemistry, don't just memorize reactions. Understand the mechanism behind them to solve unfamiliar problems." },
    { text: "In Maths, practice is everything. Solve a variety of problems to build speed and accuracy." },
    { text: "Use the elimination technique in multiple-choice questions. Ruling out incorrect options increases your chances of getting it right." },
    { text: "Create a 'mistake notebook'. Every time you get a question wrong, write it down and understand why. Review it weekly." }
];

const main = async () => {
    try {
        console.log("Starting to populate 'tips' collection...");
        const batch = writeBatch(db);
        const tipsRef = collection(db, "tips");

        tips.forEach(tip => {
            const docRef = doc(tipsRef);
            batch.set(docRef, tip);
        });
        
        await batch.commit();

        console.log(`\n✅ Successfully populated 'tips' collection with ${tips.length} new entries in Firestore!`);
        console.log("\nYou can now close this script (Ctrl+C).");

    } catch (error) {
        console.error("\n❌ Error populating Firestore:", error);
        process.exit(1);
    }
}

main();
