
import type { Flashcard } from '../types';

export const calculus1Flashcards: Omit<Flashcard, 'id'>[] = [
    {
        question: "What is the definition of a derivative?",
        answer: "The derivative of a function f(x) with respect to x is the function f'(x) and is defined as f'(x) = lim(h→0) [f(x+h) - f(x)] / h."
    },
    {
        question: "What is the Power Rule for differentiation?",
        answer: "The Power Rule states that if f(x) = xⁿ, then f'(x) = nxⁿ⁻¹."
    },
    {
        question: "What is the Product Rule for differentiation?",
        answer: "The Product Rule states that for two functions u(x) and v(x), the derivative of their product is (uv)' = u'v + uv'."
    },
    {
        question: "What is the Quotient Rule for differentiation?",
        answer: "The Quotient Rule states that for two functions u(x) and v(x), the derivative of their quotient is (u/v)' = (u'v - uv') / v²."
    },
    {
        question: "What is the Chain Rule for differentiation?",
        answer: "The Chain Rule states that for a composite function f(g(x)), the derivative is f'(g(x)) * g'(x)."
    },
    {
        question: "What is the First Derivative Test?",
        answer: "The First Derivative Test is used to determine the local extrema of a function. If f'(x) changes from positive to negative, there is a local maximum. If it changes from negative to positive, there is a local minimum."
    },
    {
        question: "What is the derivative of sin(x)?",
        answer: "The derivative of sin(x) is cos(x)."
    },
    {
        question: "What is the derivative of e^x?",
        answer: "The derivative of e^x is e^x."
    },
    {
        question: "What does the Mean Value Theorem state?",
        answer: "If a function f is continuous on [a, b] and differentiable on (a, b), then there exists some c in (a, b) such that f'(c) = [f(b) - f(a)] / (b - a)."
    }
];
