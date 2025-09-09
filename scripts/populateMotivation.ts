
// To run this script:
// 1. Make sure you have tsx installed: npm install -g tsx
// 2. Run from the root of your project: tsx ./scripts/populateMotivation.ts

import { collection, writeBatch, doc } from 'firebase/firestore';
import { db } from '../src/lib/firebase';

console.log("Firebase initialized for script.");

const motivationalMessages = {
  motivated: [
    { message: "That's the spirit! Use this energy to tackle your most challenging topic today. You're on fire!" },
    { message: "Awesome! Keep that momentum going. Every problem you solve today is a step closer to your dream." },
    { message: "Feeling motivated is your superpower today. Channel it into a deep study session. Let's conquer it!" },
    { message: "You're in the zone! Ride this wave of motivation and see how much you can accomplish. I'm cheering for you!" },
    { message: "Let's go! This is the perfect time to push your limits. What's one thing you can master right now?" }
  ],
  focused: [
    { message: "Deep focus is a treasure. Protect it. Close a few tabs, put your phone away, and dive deep into your work." },
    { message: "It's not about feeling hyper, it's about being consistent. You're doing the real work right now. Keep it up." },
    { message: "This steady focus is what builds empires. One brick, one problem, one chapter at a time. You've got this." },
    { message: "Even when motivation wavers, focus remains. This is the discipline that leads to success. Stay locked in." },
    { message: "You're in a state of flow. Don't break it. The world can wait. Your future is being built in this quiet moment." }
  ],
  worried: [
    { message: "It's okay to feel worried. It means you care. Take a deep breath, and let's break down one small problem together." },
    { message: "Worry is just a cloud. Let's find the sun. Focus on the very next step, no matter how small. I'm here with you." },
    { message: "I know it feels heavy, but you are stronger than your worries. Channel that energy into one productive task. You can do this." },
    { message: "Don't let the shadow of worry darken your progress. Remember how far you've come. Take a short break, then let's try again." },
    { message: "A flower can't bloom without a little rain. This feeling is temporary. Your strength is permanent. Let's prove it." }
  ]
};

const main = async () => {
    try {
        console.log("Starting to populate motivation collections...");
        const batch = writeBatch(db);

        for (const [mood, messages] of Object.entries(motivationalMessages)) {
            const collectionName = `motivation-${mood}`;
            const collectionRef = collection(db, collectionName);
            messages.forEach(msg => {
                const docRef = doc(collectionRef);
                batch.set(docRef, msg);
            });
            console.log(`Prepared ${messages.length} messages for '${collectionName}'.`);
        }
        
        await batch.commit();

        console.log(`\n✅ Successfully populated all motivation collections in Firestore!`);
        console.log("\nYou can now close this script (Ctrl+C).");

    } catch (error) {
        console.error("\n❌ Error populating Firestore:", error);
        process.exit(1);
    }
}

main();
