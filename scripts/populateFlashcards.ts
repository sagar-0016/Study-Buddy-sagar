
// To run this script:
// 1. Make sure you have tsx installed: npm install -g tsx
// 2. Run from the root of your project: tsx ./scripts/populateFlashcards.ts

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

const mainDecks = [
  {
    category: 'main',
    title: 'Biology Fundamentals',
    description: 'Dive into the building blocks of life, from cellular structures to complex biological processes.',
    icon: 'Dna',
    status: 'not-available',
    href: '/flashcards/not-for-you',
  },
  {
    category: 'main',
    title: 'Mathematics',
    description: 'Master algebra, geometry, and calculus concepts with interactive problem-solving flashcards.',
    icon: 'Sigma',
    status: 'available',
    href: '/flashcards/maths',
  },
  {
    category: 'main',
    title: 'Chemistry Basics',
    description: 'Master the periodic table, chemical reactions, and fundamental principles of chemistry.',
    icon: 'FlaskConical',
    status: 'available',
    href: '/flashcards/chemistry',
  },
  {
    category: 'main',
    title: 'Physics Concepts',
    description: 'Understand the fundamental laws that govern our universe, from mechanics to quantum physics.',
    icon: 'Atom',
    status: 'available',
    href: '/flashcards/physics',
  },
   {
    category: 'main',
    title: 'AI & Machine Learning',
    description: 'Explore the core concepts of AI, neural networks, and machine learning algorithms.',
    icon: 'BrainCircuit',
    status: 'not-available',
    href: '/flashcards/not-for-you',
  },
  {
    category: 'main',
    title: 'Space & Astronomy',
    description: 'Journey through the cosmos and learn about planets, stars, galaxies, and the mysteries of space.',
    icon: 'Rocket',
    status: 'not-available',
    href: '/flashcards/not-for-you',
  },
];

const physicsDecks = [
    {
        category: 'physics',
        title: 'Kinematics',
        description: 'Study motion, including displacement, velocity, and acceleration, without considering its causes.',
        icon: 'Wind',
        status: 'available',
        difficulty: 'Basic',
        href: '/flashcards/physics/kinematics',
    },
    {
        category: 'physics',
        title: "Forces, Newton's Laws & Friction",
        description: 'Understand the fundamental principles governing motion and the forces that resist it.',
        icon: 'Orbit',
        status: 'available',
        difficulty: 'Intermediate',
        href: '/flashcards/physics/forces',
    },
    {
        category: 'physics',
        title: 'Thermodynamics',
        description: 'Explore heat, temperature, and the transfer of energy in physical systems.',
        icon: 'Thermometer',
        status: 'coming-soon',
        difficulty: 'Intermediate',
        href: '/flashcards/not-for-you',
    },
    {
        category: 'physics',
        title: 'Electricity & Magnetism',
        description: 'Delve into electric circuits, magnetic fields, and electromagnetic waves.',
        icon: 'Zap',
        status: 'coming-soon',
        difficulty: 'Advanced',
        href: '/flashcards/not-for-you',
    },
    {
        category: 'physics',
        title: 'Optics',
        description: 'Study the behavior of light, from reflection and refraction to wave optics.',
        icon: 'Waves',
        status: 'coming-soon',
        difficulty: 'Intermediate',
        href: '/flashcards/not-for-you',
    },
     {
        category: 'physics',
        title: 'Modern Physics',
        description: 'Grasp the concepts of relativity, quantum mechanics, and nuclear physics.',
        icon: 'Atom',
        status: 'coming-soon',
        difficulty: 'Advanced',
        href: '/flashcards/not-for-you',
    },
];

const chemistryDecks = [
    {
        category: 'chemistry',
        title: 'General Organic Chemistry (GOC)',
        description: 'Master the fundamental concepts that govern organic reactions and structures.',
        icon: 'Combine',
        status: 'available',
        difficulty: 'Advanced',
        href: '/flashcards/chemistry/goc',
    },
    {
        category: 'chemistry',
        title: 'Physical Chemistry',
        description: 'Explore the fundamental principles governing chemical systems, energy, and matter.',
        icon: 'Atom',
        status: 'coming-soon',
        difficulty: 'Advanced',
        href: '/flashcards/not-for-you',
    },
    {
        category: 'chemistry',
        title: 'Inorganic Chemistry',
        description: 'Study the properties and behavior of inorganic compounds, including metals and minerals.',
        icon: 'TestTube',
        status: 'coming-soon',
        difficulty: 'Intermediate',
        href: '/flashcards/not-for-you',
    },
    {
        category: 'chemistry',
        title: 'Stoichiometry',
        description: 'Master the quantitative relationships between reactants and products in chemical reactions.',
        icon: 'Beaker',
        status: 'coming-soon',
        difficulty: 'Basic',
        href: '/flashcards/not-for-you',
    },
     {
        category: 'chemistry',
        title: 'Chemical Bonding',
        description: 'Understand the forces that hold atoms together to form molecules and compounds.',
        icon: 'FlaskConical',
        status: 'coming-soon',
        difficulty: 'Intermediate',
        href: '/flashcards/not-for-you',
    },
];

const mathsDecks = [
    {
        category: 'maths',
        title: 'Algebra Basics',
        description: 'Introduction to variables, expressions, and solving linear equations step by step.',
        icon: 'CaseUpper',
        status: 'coming-soon',
        difficulty: 'Intermediate',
        href: '/flashcards/not-for-you',
    },
    {
        category: 'maths',
        title: 'Geometry Fundamentals',
        description: 'Explore shapes, angles, area, perimeter, and basic geometric theorems and proofs.',
        icon: 'Shapes',
        status: 'coming-soon',
        difficulty: 'Intermediate',
        href: '/flashcards/not-for-you',
    },
    {
        category: 'maths',
        title: 'Trigonometry',
        description: 'Master sine, cosine, tangent, and their applications in solving triangles and wave functions.',
        icon: 'FunctionSquare',
        status: 'coming-soon',
        difficulty: 'Intermediate',
        href: '/flashcards/not-for-you',
    },
    {
        category: 'maths',
        title: 'Calculus I',
        description: 'Learn limits, derivatives, and their applications in optimization and curve analysis.',
        icon: 'Sigma', // Representing ∫
        status: 'coming-soon',
        difficulty: 'Advanced',
        href: '/flashcards/not-for-you',
    },
     {
        category: 'maths',
        title: 'Calculus II',
        description: 'Master integration techniques, series, and applications of definite integrals.',
        icon: 'Sigma',
        status: 'coming-soon',
        difficulty: 'Advanced',
        href: '/flashcards/not-for-you',
    },
    {
        category: 'maths',
        title: 'Statistics & Probability',
        description: 'Understand data analysis, probability distributions, and statistical inference.',
        icon: 'Bot',
        status: 'coming-soon',
        difficulty: 'Intermediate',
        href: '/flashcards/not-for-you',
    },
];


const main = async () => {
    try {
        console.log("Starting to populate 'flashcardDecks' collection...");
        const batch = writeBatch(db);
        const decksRef = collection(db, "flashcardDecks");
        
        const allDecks = [...mainDecks, ...physicsDecks, ...chemistryDecks, ...mathsDecks];

        allDecks.forEach(deck => {
            const docRef = doc(decksRef);
            batch.set(docRef, deck);
        });
        
        await batch.commit();

        console.log(`\n✅ Successfully populated 'flashcardDecks' collection with ${allDecks.length} new decks in Firestore!`);
        console.log("\nYou can now close this script (Ctrl+C).");

    } catch (error) {
        console.error("\n❌ Error populating Firestore:", error);
        process.exit(1);
    }
}

main();
