
import type { Flashcard } from '../types';

export const algebraFlashcards: Omit<Flashcard, 'id'>[] = [
    {
        question: "What is the quadratic formula?",
        answer: "The solution to ax² + bx + c = 0 is given by x = [-b ± √(b²-4ac)] / 2a."
    },
    {
        question: "What is the binomial theorem?",
        answer: "(x + y)ⁿ = Σ [nCr * x^(n-r) * y^r] for r from 0 to n."
    },
    {
        question: "Define a matrix.",
        answer: "A rectangular array or table of numbers, symbols, or expressions, arranged in rows and columns."
    },
    {
        question: "What is the determinant of a 2x2 matrix [[a, b], [c, d]]?",
        answer: "The determinant is ad - bc."
    },
    {
        question: "What is the fundamental theorem of algebra?",
        answer: "Every non-constant single-variable polynomial with complex coefficients has at least one complex root."
    },
    {
        question: "What are logarithms?",
        answer: "A quantity representing the power to which a fixed number (the base) must be raised to produce a given number."
    },
    {
        question: "What is the property of a function?",
        answer: "A relation between a set of inputs and a set of permissible outputs with the property that each input is related to exactly one output."
    },
    {
        question: "What is an arithmetic progression (AP)?",
        answer: "A sequence of numbers such that the difference between the consecutive terms is constant."
    },
    {
        question: "What is a geometric progression (GP)?",
        answer: "A sequence of non-zero numbers where each term after the first is found by multiplying the previous one by a fixed, non-zero number called the common ratio."
    }
];
