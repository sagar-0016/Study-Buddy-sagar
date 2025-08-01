
// To run this script:
// 1. Make sure you have tsx installed: npm install -g tsx
// 2. Run from the root of your project: tsx ./scripts/populateRevisions.ts

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, serverTimestamp, writeBatch, doc } from 'firebase/firestore';

// IMPORTANT: Paste your Firebase config here
const firebaseConfig = {
  apiKey: "AIzaSyBv26GpTGNi56cOHY23H4JWk_Q0iu7WRbg",
  authDomain: "study-buddy-7357a.firebaseapp.com",
  projectId: "study-buddy-7357a",
  storageBucket: "study-buddy-7357a.firebasestorage.app",
  messagingSenderId: "286721031921",
  appId: "1:286721031921:web:bdebedc76dd6081dbfb350"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("Firebase initialized for script.");

const revisionTopics = [
    // --- Physics ---
    {
        subject: "Physics",
        chapterName: "Rotational Motion",
        topicName: "Moment of Inertia of a Solid Sphere",
        hints: "Formula involves M and R. It's a fraction. Think about the standard formula.",
        recallSuccess: 5,
        recallFails: 1,
    },
    {
        subject: "Physics",
        chapterName: "Thermodynamics",
        topicName: "First Law of Thermodynamics",
        hints: "Relates internal energy, heat, and work. ΔU = Q - W.",
        recallSuccess: 8,
        recallFails: 0,
    },
    {
        subject: "Physics",
        chapterName: "Optics",
        topicName: "Lens Maker's Formula",
        hints: "Relates focal length, refractive index, and radii of curvature. 1/f = (n-1)(1/R1 - 1/R2).",
        recallSuccess: 2,
        recallFails: 3,
    },
     {
        subject: "Physics",
        chapterName: "Electrostatics",
        topicName: "Gauss's Law",
        hints: "Relates electric flux through a closed surface to the enclosed charge. Φ = q_enc / ε₀.",
        recallSuccess: 0,
        recallFails: 0,
    },
    {
        subject: "Physics",
        chapterName: "Kinematics",
        topicName: "Equations of Motion for constant acceleration",
        hints: "Three main equations. v = u + at, s = ut + 0.5at^2, v^2 = u^2 + 2as.",
        recallSuccess: 10,
        recallFails: 0,
    },
    // --- Chemistry ---
    {
        subject: "Chemistry",
        chapterName: "Chemical Bonding",
        topicName: "VSEPR Theory Postulates",
        hints: "Electron pairs repel each other. Lone pairs repel more than bond pairs. Geometry vs. Shape.",
        recallSuccess: 0,
        recallFails: 2,
    },
    {
        subject: "Chemistry",
        chapterName: "Equilibrium",
        topicName: "Le Chatelier's Principle",
        hints: "System at equilibrium counteracts changes in concentration, pressure, or temperature.",
        recallSuccess: 4,
        recallFails: 4,
    },
    {
        subject: "Chemistry",
        chapterName: "Organic Chemistry",
        topicName: "SN1 vs SN2 Reactions",
        hints: "SN1: 2 steps, carbocation, favored by tertiary halides. SN2: 1 step, backside attack, favored by primary halides.",
        recallSuccess: 3,
        recallFails: 1,
    },
    {
        subject: "Chemistry",
        chapterName: "Electrochemistry",
        topicName: "Nernst Equation",
        hints: "Calculates cell potential under non-standard conditions. E = E° - (RT/nF)ln(Q).",
        recallSuccess: 1,
        recallFails: 1,
    },
    {
        subject: "Chemistry",
        chapterName: "Solutions",
        topicName: "Colligative Properties",
        hints: "Properties that depend on solute concentration, not identity. E.g., boiling point elevation, freezing point depression.",
        recallSuccess: 6,
        recallFails: 0,
    },
    // --- Maths ---
    {
        subject: "Maths",
        chapterName: "Calculus",
        topicName: "Integration by Parts Formula",
        hints: "∫u dv = uv - ∫v du. Useful for products of functions.",
        recallSuccess: 1,
        recallFails: 5,
    },
    {
        subject: "Maths",
        chapterName: "Coordinate Geometry",
        topicName: "Equation of a Circle",
        hints: "Standard form: (x-h)^2 + (y-k)^2 = r^2. General form: x^2 + y^2 + 2gx + 2fy + c = 0.",
        recallSuccess: 9,
        recallFails: 1,
    },
    {
        subject: "Maths",
        chapterName: "Trigonometry",
        topicName: "Double Angle Formulas for Cosine",
        hints: "cos(2θ) has three forms: cos^2(θ) - sin^2(θ), 2cos^2(θ) - 1, 1 - 2sin^2(θ).",
        recallSuccess: 0,
        recallFails: 0,
    },
    {
        subject: "Maths",
        chapterName: "Algebra",
        topicName: "Binomial Theorem for any index",
        hints: "(1+x)^n = 1 + nx + n(n-1)/2! x^2 + ...",
        recallSuccess: 2,
        recallFails: 2,
    },
    {
        subject: "Maths",
        chapterName: "Vectors",
        topicName: "Scalar Triple Product",
        hints: "Represents the volume of a parallelepiped. a · (b x c). Calculated as a determinant.",
        recallSuccess: 3,
        recallFails: 0,
    }
];

const main = async () => {
    try {
        console.log("Starting to populate 'revisions' collection...");
        const batch = writeBatch(db);
        const revisionsRef = collection(db, "revisions");

        revisionTopics.forEach(topic => {
            const docRef = doc(revisionsRef); // Create a new document reference
            batch.set(docRef, {
                ...topic,
                lastReviewed: serverTimestamp()
            });
        });
        
        await batch.commit();

        console.log(`\n✅ Successfully populated 'revisions' collection with ${revisionTopics.length} topics in Firestore!`);
        console.log("\nYou can now close this script (Ctrl+C).");

    } catch (error) {
        console.error("\n❌ Error populating Firestore:", error);
        process.exit(1);
    }
}

main();
