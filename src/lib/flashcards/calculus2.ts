
import type { Flashcard } from '../types';

export const calculus2Flashcards: Omit<Flashcard, 'id'>[] = [
    {
        question: "What is the Fundamental Theorem of Calculus, Part 1?",
        answer: "If f is continuous on [a, b], then the function g(x) = ∫[a,x] f(t) dt is continuous on [a, b] and differentiable on (a, b), and g'(x) = f(x)."
    },
    {
        question: "What is the Fundamental Theorem of Calculus, Part 2?",
        answer: "If f is continuous on [a, b] and F is an antiderivative of f, then ∫[a,b] f(x) dx = F(b) - F(a)."
    },
    {
        question: "What is Integration by Parts?",
        answer: "A technique used to find the integral of a product of functions. The formula is ∫u dv = uv - ∫v du."
    },
    {
        question: "What is the formula for the volume of a solid of revolution using the disk method?",
        answer: "The volume V is given by V = π ∫[a,b] [R(x)]² dx, where R(x) is the radius of the disk."
    },
    {
        question: "What is a Taylor series?",
        answer: "A representation of a function as an infinite sum of terms, calculated from the values of the function's derivatives at a single point."
    },
    {
        question: "When does a geometric series converge?",
        answer: "A geometric series converges if and only if the absolute value of the common ratio |r| is less than 1."
    },
    {
        question: "What is L'Hôpital's Rule?",
        answer: "A rule that uses derivatives to evaluate limits of indeterminate forms like 0/0 or ∞/∞."
    },
    {
        question: "How do you find the area between two curves?",
        answer: "The area A between the curves y = f(x) and y = g(x) from x = a to x = b is A = ∫[a,b] |f(x) - g(x)| dx."
    }
];
