
import type { Flashcard } from '../types';

export const stoichiometryFlashcards: Omit<Flashcard, 'id'>[] = [
    {
        question: "What is stoichiometry?",
        answer: "The calculation of reactants and products in chemical reactions."
    },
    {
        question: "What is the mole concept?",
        answer: "A convenient method of expressing the amount of a substance. One mole of any substance contains Avogadro's number of particles (approx. 6.022 x 10²³)."
    },
    {
        question: "What is molar mass?",
        answer: "The mass of one mole of a substance, usually expressed in grams per mole (g/mol)."
    },
    {
        question: "What is a limiting reactant?",
        answer: "The reactant that is completely consumed in a chemical reaction and limits the amount of product that can be formed."
    },
    {
        question: "What is theoretical yield?",
        answer: "The maximum amount of product that can be produced from a given amount of reactant."
    },
    {
        question: "What is percent yield?",
        answer: "The ratio of the actual yield to the theoretical yield, multiplied by 100%. (Actual Yield / Theoretical Yield) * 100%."
    },
    {
        question: "How do you balance a chemical equation?",
        answer: "By ensuring that the number of atoms of each element is the same on both the reactant and product sides of the equation."
    },
    {
        question: "What does the concentration of a solution mean?",
        answer: "The amount of a substance (solute) dissolved in a certain amount of another substance (solvent), often expressed as molarity (moles/liter)."
    }
];
