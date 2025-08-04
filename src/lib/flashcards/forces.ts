
import type { Flashcard } from '../types';

export const forcesFlashcards: Omit<Flashcard, 'id'>[] = [
    {
        question: "What is Newton's First Law of Motion?",
        answer: "An object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an unbalanced force. Also known as the Law of Inertia."
    },
    {
        question: "What is Newton's Second Law of Motion?",
        answer: "The acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. F = ma."
    },
    {
        question: "What is Newton's Third Law of Motion?",
        answer: "For every action, there is an equal and opposite reaction."
    },
    {
        question: "What is friction?",
        answer: "The force resisting the relative motion of solid surfaces, fluid layers, and material elements sliding against each other."
    },
    {
        question: "What is the difference between static and kinetic friction?",
        answer: "Static friction acts on objects when they are resting on a surface, while kinetic friction acts on objects when they are in motion."
    },
    {
        question: "What is a free-body diagram?",
        answer: "A graphical illustration used to visualize the forces acting upon a body in a given condition."
    },
    {
        question: "What is tension?",
        answer: "The pulling force transmitted axially by the means of a string, cable, chain, or similar one-dimensional continuous object."
    },
    {
        question: "What is centripetal force?",
        answer: "A force that acts on a body moving in a circular path and is directed towards the center around which the body is moving. F = mv²/r."
    }
];
