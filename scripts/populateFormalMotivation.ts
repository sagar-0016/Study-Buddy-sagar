
// To run this script:
// 1. Make sure you have tsx installed: npm install -g tsx
// 2. Run from the root of your project: tsx ./scripts/populateFormalMotivation.ts

import { collection, writeBatch, doc } from 'firebase/firestore';
import { db } from '../src/lib/firebase';

console.log("Firebase initialized for script.");

const formalMotivationalMessages = {
  motivated: [
    { message: "Excellent. Channel this motivation into productive work. Consistent effort yields the best results." },
    { message: "This is the optimal mindset for progress. Continue with this momentum to achieve your daily targets." },
    { message: "Motivation is high. This is a good opportunity to tackle a challenging topic or a complex problem set." }
  ],
  focused: [
    { message: "Deep focus is key. Maintain this state to ensure high-quality work and effective learning." },
    { message: "Your concentration is your greatest asset right now. Minimize distractions and continue your session." },
    { message: "This level of focus is what leads to mastery. Every moment spent in this state is a significant gain." }
  ],
  worried: [
    { message: "Acknowledge the concern, then refocus on the immediate task. Break down the problem into smaller, manageable steps." },
    { message: "Worry is a natural part of a challenging journey. Use it as a signal to review your preparation and strategy, then proceed." },
    { message: "Convert feelings of worry into actionable steps. What is one small thing you can do right now to make progress?" }
  ]
};

const main = async () => {
    try {
        console.log("Starting to populate formal motivation collections...");
        const batch = writeBatch(db);

        for (const [mood, messages] of Object.entries(formalMotivationalMessages)) {
            const collectionName = `motivation-${mood}-formal`;
            const collectionRef = collection(db, collectionName);
            messages.forEach(msg => {
                const docRef = doc(collectionRef);
                batch.set(docRef, msg);
            });
            console.log(`Prepared ${messages.length} messages for '${collectionName}'.`);
        }
        
        await batch.commit();

        console.log(`\n✅ Successfully populated all formal motivation collections in Firestore!`);
        console.log("\nYou can now close this script (Ctrl+C).");

    } catch (error) {
        console.error("\n❌ Error populating Firestore:", error);
        process.exit(1);
    }
}

main();
