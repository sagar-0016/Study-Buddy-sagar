
import type { Flashcard } from '../types';

export const kinematicsFlashcards: Omit<Flashcard, 'id'>[] = [
    {
        question: "What is the difference between distance and displacement?",
        answer: "Distance is a scalar quantity that refers to 'how much ground an object has covered' during its motion. Displacement is a vector quantity that refers to 'how far out of place an object is'; it is the object's overall change in position."
    },
    {
        question: "What is the formula for average velocity?",
        answer: "Average velocity = (Total displacement) / (Total time taken)."
    },
    {
        question: "What are the three main equations of motion for constant acceleration?",
        answer: "1. v = u + at \n2. s = ut + (1/2)at² \n3. v² = u² + 2as"
    },
    {
        question: "What is acceleration?",
        answer: "The rate of change of velocity of an object with respect to time."
    },
    {
        question: "What is projectile motion?",
        answer: "The motion of an object thrown or projected into the air, subject only to the acceleration of gravity."
    },
    {
        question: "What is the range of a projectile?",
        answer: "The horizontal distance traveled by a projectile before it returns to its original height."
    },
    {
        question: "What is relative velocity?",
        answer: "The velocity of an object or observer B in the rest frame of another object or observer A."
    },
    {
        question: "In uniform circular motion, is there any acceleration?",
        answer: "Yes, there is centripetal acceleration, which is directed towards the center of the circle, even though the speed is constant."
    }
];
