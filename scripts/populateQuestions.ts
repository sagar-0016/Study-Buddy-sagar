
// To run this script:
// 1. Make sure you have tsx installed: npm install -g tsx
// 2. Run from the root of your project: tsx ./scripts/populateQuestions.ts

import { getFirestore, collection, writeBatch, doc } from 'firebase/firestore';
import { db } from '../src/lib/firebase';

console.log("Firebase initialized for script.");

const questions = [
    // --- Physics ---
    {
        questionText: "A body is projected vertically upwards. The times corresponding to height h while ascending and while descending are t1 and t2 respectively. What is the velocity of projection?",
        answerType: "options",
        options: ["g(t1+t2)/2", "g(t2-t1)", "g√(t1t2)", "g(t1+t2)"],
        correctAnswer: "g(t1+t2)/2",
        isAttempted: false,
        subject: "Physics",
    },
    {
        questionText: "What is the angle between the electric dipole moment and the electric field strength due to it on the equatorial line?",
        answerType: "options",
        options: ["0°", "90°", "180°", "45°"],
        correctAnswer: "180°",
        isAttempted: false,
        subject: "Physics",
    },
    {
        questionText: "The focal length of a convex lens is 20 cm. What is its power in diopters?",
        answerType: "text",
        correctAnswer: "5",
        isAttempted: false,
        subject: "Physics",
    },
    // --- Chemistry ---
    {
        questionText: "Which of the following is not a colligative property?",
        answerType: "options",
        options: ["Boiling point elevation", "Optical activity", "Osmotic pressure", "Freezing point depression"],
        correctAnswer: "Optical activity",
        isAttempted: false,
        subject: "Chemistry",
    },
    {
        questionText: "What is the hybridization of the central atom in SF6?",
        answerType: "text",
        correctAnswer: "sp3d2",
        isAttempted: false,
        subject: "Chemistry",
    },
    {
        questionText: "The reaction of chloroform with alcoholic KOH and p-toluidine forms:",
        answerType: "options",
        options: ["A nitrile", "An isocyanide", "An azo dye", "A diazonium salt"],
        correctAnswer: "An isocyanide",
        isAttempted: false,
        subject: "Chemistry",
    },
    // --- Maths ---
    {
        questionText: "If f(x) = (x+1)/(x-1) and g(x) = 1/x, what is the value of (fog)(x)?",
        answerType: "text",
        correctAnswer: "(1+x)/(1-x)",
        isAttempted: false,
        subject: "Maths",
    },
    {
        questionText: "The value of the determinant | 1 a a² | | 1 b b² | | 1 c c² | is:",
        answerType: "options",
        options: ["(a-b)(b-c)(c-a)", "(a+b)(b+c)(c+a)", "a² + b² + c²", "abc"],
        correctAnswer: "(a-b)(b-c)(c-a)",
        isAttempted: false,
        subject: "Maths",
    },
     {
        questionText: "What is the derivative of sin⁻¹(x) + cos⁻¹(x) with respect to x?",
        answerType: "text",
        correctAnswer: "0",
        isAttempted: false,
        subject: "Maths",
    },
     {
        questionText: "The number of ways in which 6 men and 5 women can dine at a round table if no two women are to sit together is given by:",
        answerType: "options",
        options: ["6! × 5!", "30", "5! × 4!", "7! × 5!"],
        correctAnswer: "6! × 5!",
        isAttempted: false,
        subject: "Maths",
    }
];

const main = async () => {
    try {
        console.log("Starting to populate 'questions' collection...");
        const batch = writeBatch(db);
        const questionsRef = collection(db, "questions");

        questions.forEach(question => {
            const docRef = doc(questionsRef);
            batch.set(docRef, question);
        });
        
        await batch.commit();

        console.log(`\n✅ Successfully populated 'questions' collection with ${questions.length} new questions in Firestore!`);
        console.log("\nYou can now close this script (Ctrl+C).");

    } catch (error) {
        console.error("\n❌ Error populating Firestore:", error);
        process.exit(1);
    }
}

main();
