
import type { Flashcard } from '../types';

export const physicalChemistryFlashcards: Omit<Flashcard, 'id'>[] = [
    {
        question: "What is the First Law of Thermodynamics?",
        answer: "The change in internal energy of a system is equal to the heat added to the system minus the work done by the system. ΔU = Q - W."
    },
    {
        question: "What is the Second Law of Thermodynamics?",
        answer: "It states that the total entropy of an isolated system can only increase over time."
    },
    {
        question: "What is Hess's Law?",
        answer: "It states that the total enthalpy change for a reaction is the sum of all changes, regardless of the multiple steps or stages in which the reaction can be divided."
    },
    {
        question: "What is chemical equilibrium?",
        answer: "The state in which both reactants and products are present in concentrations which have no further tendency to change with time."
    },
    {
        question: "What is Le Chatelier's Principle?",
        answer: "When a system at equilibrium is subjected to a change in concentration, temperature, volume, or pressure, the system readjusts itself to counteract the effect of the applied change."
    },
    {
        question: "What is a colligative property?",
        answer: "Properties of solutions that depend upon the ratio of the number of solute particles to the number of solvent molecules in a solution, and not on the nature of the chemical species present."
    },
    {
        question: "What is the Nernst equation?",
        answer: "An equation that relates the reduction potential of a half-cell at any point in time to the standard electrode potential, temperature, activity, and reaction quotient of the underlying reactions."
    },
    {
        question: "What is activation energy?",
        answer: "The minimum amount of energy that must be provided for compounds to result in a chemical reaction."
    }
];
