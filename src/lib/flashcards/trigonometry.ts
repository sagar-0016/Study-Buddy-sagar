
import type { Flashcard } from '../types';

export const trigonometryFlashcards: Omit<Flashcard, 'id'>[] = [
    {
        question: "What are the three main trigonometric functions?",
        answer: "Sine (sin), Cosine (cos), and Tangent (tan)."
    },
    {
        question: "What is SOHCAHTOA?",
        answer: "A mnemonic for remembering the definitions of the trigonometric functions: Sin = Opposite/Hypotenuse, Cos = Adjacent/Hypotenuse, Tan = Opposite/Adjacent."
    },
    {
        question: "What is the Pythagorean identity in trigonometry?",
        answer: "sin²(θ) + cos²(θ) = 1."
    },
    {
        question: "What is the Law of Sines?",
        answer: "A law relating the lengths of the sides of a triangle to the sines of its angles. a/sin(A) = b/sin(B) = c/sin(C)."
    },
    {
        question: "What is the Law of Cosines?",
        answer: "A law relating the lengths of the sides of a triangle to the cosine of one of its angles. c² = a² + b² - 2ab*cos(C)."
    },
    {
        question: "What is the period of the sine function?",
        answer: "The period of the sine function is 2π."
    },
    {
        question: "What is the range of the cosine function?",
        answer: "The range of the cosine function is [-1, 1]."
    },
    {
        question: "What is an inverse trigonometric function?",
        answer: "A function that is the inverse of a trigonometric function, used to find an angle from its trigonometric ratio."
    }
];
