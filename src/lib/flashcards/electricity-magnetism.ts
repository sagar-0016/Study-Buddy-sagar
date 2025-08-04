
import type { Flashcard } from '../types';

export const electricityMagnetismFlashcards: Omit<Flashcard, 'id'>[] = [
    {
        question: "What is Coulomb's Law?",
        answer: "It states that the electrostatic force between two point charges is directly proportional to the product of the magnitudes of charges and inversely proportional to the square of the distance between them. F = k * |q1*q2| / r²."
    },
    {
        question: "What is Ohm's Law?",
        answer: "It states that the current through a conductor between two points is directly proportional to the voltage across the two points. V = IR."
    },
    {
        question: "What is Gauss's Law for electricity?",
        answer: "It relates the distribution of electric charge to the resulting electric field. The net electric flux through any hypothetical closed surface is equal to 1/ε₀ times the net electric charge enclosed within that closed surface."
    },
    {
        question: "What is Ampere's Law?",
        answer: "It relates the integrated magnetic field around a closed loop to the electric current passing through the loop."
    },
    {
        question: "What is Faraday's Law of Induction?",
        answer: "It states that a change in the magnetic environment of a coil of wire will cause a voltage (emf) to be induced in the coil."
    },
    {
        question: "What are Maxwell's Equations?",
        answer: "A set of four fundamental equations that form the foundation of classical electromagnetism, classical optics, and electric circuits."
    },
    {
        question: "What is a capacitor?",
        answer: "A device used to store electrical energy, consisting of one or more pairs of conductors separated by an insulator."
    },
    {
        question: "What is an inductor?",
        answer: "A passive electronic component that stores energy in the form of a magnetic field."
    }
];
