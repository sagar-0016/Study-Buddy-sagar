
// To run this script:
// 1. Make sure you have tsx installed: npm install -g tsx
// 2. Run from the root of your project: tsx ./scripts/populateTrickyQuestions.ts

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

const trickyQuestions = [
    // --- Physics ---
    {
        questionText: "A uniform rope of length L and mass m hangs from a rigid support. A transverse wave pulse is produced at the lower end. What is the speed of the pulse at a distance x from the lower end?",
        answerType: "options",
        options: ["√(gx)", "√(gL)", "√(g(L-x))", "g√(x/L)"],
        correctAnswer: "√(gx)",
        isAttempted: false,
        subject: "Physics",
    },
    {
        questionText: "A solid sphere is rotating in free space. If the radius of the sphere is increased keeping its mass same, which one of the following will not be affected?",
        answerType: "options",
        options: ["Moment of inertia", "Angular momentum", "Angular velocity", "Rotational kinetic energy"],
        correctAnswer: "Angular momentum",
        isAttempted: false,
        subject: "Physics",
    },
    {
        questionText: "A small block slides down from the top of a hemisphere of radius R. At what height 'h' from the bottom does the block lose contact with the hemisphere?",
        answerType: "text",
        correctAnswer: "2R/3",
        isAttempted: false,
        subject: "Physics",
    },
    // --- Chemistry ---
    {
        questionText: "Why is an aqueous solution of borax alkaline in nature?",
        answerType: "options",
        options: ["It reacts with water to form a strong acid and strong base.", "It hydrolyzes to form a weak acid (boric acid) and a strong base (NaOH).", "Borax itself is a strong base.", "It's a salt of a strong acid and weak base."],
        correctAnswer: "It hydrolyzes to form a weak acid (boric acid) and a strong base (NaOH).",
        isAttempted: false,
        subject: "Chemistry",
    },
    {
        questionText: "Among the following, which one is a pseudo-first-order reaction?",
        answerType: "options",
        options: ["H2 + Cl2 -> 2HCl", "Acid hydrolysis of an ester", "Decomposition of N2O5", "Radioactive decay"],
        correctAnswer: "Acid hydrolysis of an ester",
        isAttempted: false,
        subject: "Chemistry",
    },
    {
        questionText: "Consider the species: O₂²⁻, O₂⁻, O₂⁺. What is the correct bond order sequence?",
        answerType: "text",
        correctAnswer: "O₂⁺ > O₂⁻ > O₂²⁻",
        isAttempted: false,
        subject: "Chemistry",
    },
    // --- Maths ---
    {
        questionText: "What is the value of the integral ∫ from -1 to 1 of (sin⁵(x) * cos⁴(x)) dx?",
        answerType: "text",
        correctAnswer: "0",
        isAttempted: false,
        subject: "Maths",
        questionHint: "Hint: Consider if the integrand is an odd or even function."
    },
    {
        questionText: "If the lines (x-1)/2 = (y+1)/3 = (z-1)/4 and (x-3)/1 = (y-k)/2 = z/1 intersect, then what is the value of k?",
        answerType: "options",
        options: ["3/2", "9/2", "2/9", "-1"],
        correctAnswer: "9/2",
        isAttempted: false,
        subject: "Maths",
    },
    {
        questionText: "What is the number of non-negative integral solutions of the equation x + y + z + w = 7?",
        answerType: "text",
        correctAnswer: "120",
        isAttempted: false,
        subject: "Maths",
        questionHint: "Hint: Use the stars and bars method."
    },
    {
        questionText: "If z is a complex number such that |z| ≥ 2, what is the minimum value of |z + 1/2|?",
        answerType: "text",
        correctAnswer: "3/2",
        isAttempted: false,
        subject: "Maths",
    }
];

const main = async () => {
    try {
        console.log("Starting to populate 'tricky-questions' collection...");
        const batch = writeBatch(db);
        const questionsRef = collection(db, "tricky-questions");

        trickyQuestions.forEach(question => {
            const docRef = doc(questionsRef);
            batch.set(docRef, question);
        });
        
        await batch.commit();

        console.log(`\n✅ Successfully populated 'tricky-questions' collection with ${trickyQuestions.length} questions in Firestore!`);
        console.log("\nYou can now close this script (Ctrl+C).");

    } catch (error) {
        console.error("\n❌ Error populating Firestore:", error);
        process.exit(1);
    }
}

main();
