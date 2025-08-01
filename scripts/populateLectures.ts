
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
    // Test Video
    {
        title: "Test Video: Hair Tutorial",
        description: "A test video added to demonstrate the lecture library functionality with user-uploaded content.",
        subject: "Chemistry", // Assigning to a subject for filtering
        videoUrl: "https://firebasestorage.googleapis.com/v0/b/study-buddy-7357a.appspot.com/o/I%20was%20SHAKING%20doing%20this%20%F0%9F%A5%B6%20%23hairstyle%20%23haircut%20%23hairtutorial%20%23shorts%20%23beauty%20%5B5qI0g3lOVGM%5D.webm?alt=media",
        thumbnailUrl: "https://placehold.co/1280x720.png",
        channel: "Test Channel",
        duration: "0:30"
    },
    // Physics
    {
        title: "Vectors - Full Chapter",
        description: "Everything you need to know about vectors for JEE, from basics to advanced applications in physics problems.",
        subject: "Physics",
        videoUrl: "https://www.youtube.com/watch?v=qqj34wF_8iI",
        thumbnailUrl: "https://i.ytimg.com/vi/qqj34wF_8iI/hq720.jpg",
        channel: "Physics Wallah",
        duration: "1:45:12"
    },
    {
        title: "Kinematics 1D in One Shot",
        description: "A complete one-shot lecture covering all concepts, formulas, and problem-solving techniques for Kinematics in 1D.",
        subject: "Physics",
        videoUrl: "https://www.youtube.com/watch?v=1u2F9-lG_4w",
        thumbnailUrl: "https://i.ytimg.com/vi/1u2F9-lG_4w/hq720.jpg",
        channel: "Aman Dhattarwal",
        duration: "2:30:55"
    },
    {
        title: "Newton's Laws of Motion (NLM)",
        description: "Deep dive into Newton's three laws of motion with examples, free body diagrams, and friction.",
        subject: "Physics",
        videoUrl: "https://www.youtube.com/watch?v=8sJ124H0edI",
        thumbnailUrl: "https://i.ytimg.com/vi/8sJ124H0edI/hq720.jpg",
        channel: "Unacademy JEE",
        duration: "3:10:02"
    },
    {
        title: "Rotational Motion for JEE",
        description: "Master torque, moment of inertia, angular momentum, and rolling motion in this comprehensive lecture.",
        subject: "Physics",
        videoUrl: "https://www.youtube.com/watch?v=hie4u4So1nU",
        thumbnailUrl: "https://i.ytimg.com/vi/hie4u4So1nU/hq720.jpg",
        channel: "Vedantu JEE",
        duration: "4:05:30"
    },
    {
        title: "Thermodynamics in 4 Hours",
        description: "Complete chapter revision of Thermodynamics including all laws, processes, and Carnot engine for JEE Main & Advanced.",
        subject: "Physics",
        videoUrl: "https://www.youtube.com/watch?v=L5pMAeGqK2s",
        thumbnailUrl: "https://i.ytimg.com/vi/L5pMAeGqK2s/hq720.jpg",
        channel: "Physics Galaxy",
        duration: "4:00:15"
    },
    // Chemistry
    {
        title: "Mole Concept | Full Chapter",
        description: "Build a strong foundation in physical chemistry with the mole concept. Covers stoichiometry and concentration terms.",
        subject: "Chemistry",
        videoUrl: "https://www.youtube.com/watch?v=GF4tL-E2t5g",
        thumbnailUrl: "https://i.ytimg.com/vi/GF4tL-E2t5g/hq720.jpg",
        channel: "Physics Wallah",
        duration: "2:55:45"
    },
    {
        title: "General Organic Chemistry (GOC)",
        description: "The backbone of Organic Chemistry. Understand inductive effect, resonance, hyperconjugation, and their applications.",
        subject: "Chemistry",
        videoUrl: "https://www.youtube.com/watch?v=b4wS-p5a3yA",
        thumbnailUrl: "https://i.ytimg.com/vi/b4wS-p5a3yA/hq720.jpg",
        channel: "Aman Dhattarwal",
        duration: "5:12:30"
    },
    {
        title: "Chemical Bonding One Shot",
        description: "Master VSEPR theory, Hybridization, and MOT. The most important chapter in chemistry for JEE.",
        subject: "Chemistry",
        videoUrl: "https://www.youtube.com/watch?v=F-x6Chv2L4U",
        thumbnailUrl: "https://i.ytimg.com/vi/F-x6Chv2L4U/hq720.jpg",
        channel: "Unacademy JEE",
        duration: "6:30:00"
    },
    {
        title: "Coordination Compounds",
        description: "Learn about ligands, Werner's theory, VBT, CFT and isomerism in coordination compounds.",
        subject: "Chemistry",
        videoUrl: "https://www.youtube.com/watch?v=RPsZqgLpB8c",
        thumbnailUrl: "https://i.ytimg.com/vi/RPsZqgLpB8c/hq720.jpg",
        channel: "Vedantu JEE",
        duration: "3:45:10"
    },
    {
        title: "Electrochemistry Complete Guide",
        description: "Detailed explanation of electrochemical cells, Nernst equation, conductance, and Kohlrausch's law.",
        subject: "Chemistry",
        videoUrl: "https://www.youtube.com/watch?v=weo_tA1vHFs",
        thumbnailUrl: "https://i.ytimg.com/vi/weo_tA1vHFs/hq720.jpg",
        channel: "Competishun",
        duration: "4:20:50"
    },
    // Maths
    {
        title: "Sets, Relations & Functions",
        description: "The starting point for calculus and modern mathematics. Understand types of relations and functions.",
        subject: "Maths",
        videoUrl: "https://www.youtube.com/watch?v=S4hGz8m1r7c",
        thumbnailUrl: "https://i.ytimg.com/vi/S4hGz8m1r7c/hq720.jpg",
        channel: "Physics Wallah",
        duration: "3:05:11"
    },
    {
        title: "Limits & Derivatives in One Go",
        description: "Master the fundamental concepts of calculus, including standard limits, L'Hopital's rule, and first principle.",
        subject: "Maths",
        videoUrl: "https://www.youtube.com/watch?v=YrX5GZ1SAeY",
        thumbnailUrl: "https://i.ytimg.com/vi/YrX5GZ1SAeY/hq720.jpg",
        channel: "Aman Dhattarwal",
        duration: "4:55:00"
    },
    {
        title: "Matrices and Determinants",
        description: "Covering all properties of determinants, inverse of a matrix, and solving systems of linear equations.",
        subject: "Maths",
        videoUrl: "https://www.youtube.com/watch?v=kqa0-D5-kRk",
        thumbnailUrl: "https://i.ytimg.com/vi/kqa0-D5-kRk/hq720.jpg",
        channel: "Unacademy JEE",
        duration: "3:33:33"
    },
    {
        title: "Integral Calculus Masterclass",
        description: "A complete guide to indefinite and definite integration, including properties and applications like finding area.",
        subject: "Maths",
        videoUrl: "https://www.youtube.com/watch?v=9t7y-iA-yvE",
        thumbnailUrl: "https://i.ytimg.com/vi/9t7y-iA-yvE/hq720.jpg",
        channel: "Vedantu JEE",
        duration: "7:00:01"
    },
    {
        title: "Vector & 3D Geometry",
        description: "Learn about dot product, cross product, lines, planes, and shortest distance in 3D space.",
        subject: "Maths",
        videoUrl: "https://www.youtube.com/watch?v=wz3bEzE4i7k",
        thumbnailUrl: "https://i.ytimg.com/vi/wz3bEzE4i7k/hq720.jpg",
        channel: "Maths Unplugged",
        duration: "5:30:22"
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
