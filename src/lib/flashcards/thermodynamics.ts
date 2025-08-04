
import type { Flashcard } from '../types';

export const thermodynamicsFlashcards: Omit<Flashcard, 'id'>[] = [
    {
        question: "What is the Zeroth Law of Thermodynamics?",
        answer: "If two systems are each in thermal equilibrium with a third system, then they are in thermal equilibrium with each other."
    },
    {
        question: "What is the First Law of Thermodynamics?",
        answer: "Energy cannot be created or destroyed, only transferred or changed from one form to another. The change in internal energy of a system is equal to the heat added to the system minus the work done by the system (ΔU = Q - W)."
    },
    {
        question: "What is the Second Law of Thermodynamics?",
        answer: "The total entropy of an isolated system can never decrease over time. The entropy of the universe tends to a maximum."
    },
    {
        question: "What is the Third Law of Thermodynamics?",
        answer: "The entropy of a system approaches a constant value as its temperature approaches absolute zero."
    },
    {
        question: "What is an isothermal process?",
        answer: "A thermodynamic process in which the temperature of the system remains constant (ΔT = 0)."
    },
    {
        question: "What is an adiabatic process?",
        answer: "A thermodynamic process in which there is no heat transfer into or out of the system (Q = 0)."
    },
    {
        question: "What is an isobaric process?",
        answer: "A thermodynamic process in which the pressure remains constant (ΔP = 0)."
    },
    {
        question: "What is an isochoric process?",
        answer: "A thermodynamic process in which the volume remains constant (ΔV = 0), meaning no work is done by the system."
    },
    {
        question: "What is a Carnot engine?",
        answer: "A theoretical thermodynamic engine that operates on the Carnot cycle and has the maximum possible efficiency that a heat engine can have."
    }
];
