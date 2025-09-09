
// To run this script:
// 1. Make sure you have tsx installed: npm install -g tsx
// 2. Run from the root of your project: tsx ./scripts/populateBrainstorming.ts

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

const brainstormingTopics = [
    {
        subject: "Physics",
        question: "Imagine a scenario where a block is placed on a frictionless horizontal surface and is connected to a vertical spring fixed to the ceiling. If the block is displaced horizontally and released, describe the resulting motion. What concepts would you use to analyze it?",
        guideline: "This is a classic coupled oscillations problem.\n1.  **Identify the forces**: Spring force (restoring) and gravity (balanced by normal force).\n2.  **Equations of Motion**: Write down Newton's second law for both horizontal (x) and vertical (y) directions.\n3.  **Horizontal Motion**: The horizontal motion will be Simple Harmonic Motion (SHM) governed by the horizontal component of the spring force.\n4.  **Vertical Motion**: The vertical motion is also SHM, but its equilibrium position is shifted due to gravity.\n5.  **Path**: The combination of two perpendicular SHMs results in a Lissajous figure. If frequencies are the same, the path will be an ellipse or a circle. Think about the energy conservation in the system."
    },
    {
        subject: "Physics",
        question: "A solid sphere and a hollow sphere of the same mass and radius are released from the top of a rough inclined plane. Which one reaches the bottom first and why? What if the plane was frictionless?",
        guideline: "This problem involves rotational dynamics and energy conservation.\n1.  **Identify Energies**: The initial potential energy (mgh) is converted into translational kinetic energy (1/2 mv²) and rotational kinetic energy (1/2 Iω²).\n2.  **Moment of Inertia (I)**: The key difference is the moment of inertia. I_solid = (2/5)mr², I_hollow = (2/3)mr². Since I_hollow > I_solid, the hollow sphere has more rotational inertia.\n3.  **Energy Distribution**: For the same PE, the hollow sphere will convert a larger fraction of its energy into rotational KE, leaving less for translational KE. Therefore, the solid sphere will have a greater linear velocity and reach the bottom first.\n4.  **Frictionless Plane**: If the plane is frictionless, there is no torque to cause rotation. Both spheres would slide down without rolling, and they would reach the bottom at the same time, as their motion would be independent of their mass distribution."
    },
    {
        subject: "Chemistry",
        question: "You are given an unknown organic compound. It gives a positive Tollens' test, but a negative Fehling's test. It also reacts with I₂/NaOH to give a yellow precipitate. What can you deduce about the structure of this compound?",
        guideline: "This is a qualitative analysis problem. Break it down by test.\n1.  **Positive Tollens' test**: This indicates the presence of an aldehyde group (-CHO). However, aromatic aldehydes are a special case.\n2.  **Negative Fehling's test**: Most aldehydes give a positive test. A key exception is aromatic aldehydes (like benzaldehyde). They are not strong enough reducing agents for Fehling's solution. This strongly suggests the compound is an aromatic aldehyde.\n3.  **I₂/NaOH (Iodoform test)**: A positive test (yellow precipitate of CHI₃) indicates the presence of a methyl ketone (CH₃-C=O) group or a group that can be oxidized to it (like CH₃-CH(OH)-). \n4.  **Combining the Clues**: The compound has an aldehyde group (likely aromatic) and a structure that gives a positive iodoform test. This is a contradiction if they are on the same molecule in a simple way. However, think about molecules with both features. A common example is acetophenone (which is a ketone, not an aldehyde). Let's re-evaluate. If Tollens is positive, it must be an aldehyde. Could it be a non-aromatic aldehyde that fails Fehling's? Less common. The most likely scenario is a compound like 2-methylpropanal, which can be sterically hindered. BUT, the iodoform test is the key. An aldehyde that gives a positive iodoform test must be acetaldehyde (CH₃CHO). Acetaldehyde gives a positive Fehling's test. Therefore, the initial information is likely about a mixture of compounds or a very specific structure not commonly tested at this level. Let's reconsider: Is there any other group that gives a positive Tollens test? Alpha-hydroxy ketones do. So, a structure like CH₃-C(=O)-CH(OH)-R could fit. It would give a positive iodoform and Tollens test. The negative Fehling's test is still the tricky part."
    },
    {
        subject: "Chemistry",
        question: "Compare the acidity of o-nitrophenol, m-nitrophenol, and p-nitrophenol. Explain the trend using electronic effects (Inductive and Resonance).",
        guideline: "This question tests your understanding of electronic effects on acidity.\n1.  **Acidity Definition**: Acidity depends on the stability of the conjugate base (phenoxide ion) formed after losing a proton.\n2.  **Nitro Group Effects**: The -NO₂ group is electron-withdrawing. It has a -I (inductive) effect and a -M/-R (mesomeric/resonance) effect.\n3.  **Ortho-Nitrophenol**: Both -I and -M effects operate. The -M effect strongly stabilizes the negative charge on the oxygen through resonance. Additionally, intramolecular hydrogen bonding exists between the -NO₂ and -OH group. This makes the proton harder to remove, slightly decreasing acidity compared to the para isomer, but it's still very acidic.\n4.  **Meta-Nitrophenol**: Only the -I effect operates from the meta position. The -M effect does not extend to the meta position. So, it's more acidic than phenol but less acidic than ortho and para isomers.\n5.  **Para-Nitrophenol**: Both -I and -M effects operate. The -M effect delocalizes the negative charge of the phenoxide ion very effectively across the ring and onto the nitro group. There is no intramolecular H-bonding, so the proton is readily released. This makes it the most acidic of the three.\n6.  **Final Order**: p-nitrophenol > o-nitrophenol > m-nitrophenol > phenol."
    },
    {
        subject: "Maths",
        question: "How would you approach finding the number of non-negative integral solutions to the equation x + y + z <= 10? Think about how this differs from x + y + z = 10.",
        guideline: "This is a variation of the classic 'stars and bars' problem.\n1.  **The Equality Case**: For x + y + z = 10, the formula is C(n+r-1, r-1), where n=10 (stars) and r=3 (variables). The number of solutions is C(10+3-1, 3-1) = C(12, 2).\n2.  **The Inequality Case (x + y + z <= 10)**: This means x + y + z can be 0, 1, 2, ..., up to 10. You could calculate the solutions for each case and sum them up (i.e., C(2,2) + C(3,2) + ... + C(12,2)), but that's tedious.\n3.  **The 'Slack Variable' Method**: A much smarter way is to convert the inequality into an equality. Introduce a fourth, non-negative integer variable 'w' (called a slack variable). The equation now becomes x + y + z + w = 10.\n4.  **Explain the Equivalence**: If x+y+z = 9, then w=1. If x+y+z = 0, then w=10. Every solution to the inequality corresponds to exactly one unique solution to the new equality. For any set of (x,y,z) that satisfies the inequality, there is a unique 'w' that makes the equality true.\n5.  **Solve the New Equation**: Now it's a standard stars and bars problem with n=10 (stars) and r=4 (variables x, y, z, w). The number of solutions is C(10+4-1, 4-1) = C(13, 3)."
    }
];

const main = async () => {
    try {
        console.log("Starting to populate 'brainstorming' collection...");
        const batch = writeBatch(db);
        const brainstormingRef = collection(db, "brainstorming");

        brainstormingTopics.forEach(topic => {
            const docRef = doc(brainstormingRef);
            batch.set(docRef, topic);
        });
        
        await batch.commit();

        console.log(`\n✅ Successfully populated 'brainstorming' collection with ${brainstormingTopics.length} new topics in Firestore!`);
        console.log("\nYou can now close this script (Ctrl+C).");

    } catch (error) {
        console.error("\n❌ Error populating Firestore:", error);
        process.exit(1);
    }
}

main();
