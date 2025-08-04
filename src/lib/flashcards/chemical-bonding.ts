
import type { Flashcard } from '../types';

export const chemicalBondingFlashcards: Omit<Flashcard, 'id'>[] = [
    {
        question: "What is an ionic bond?",
        answer: "A chemical bond formed through an electrostatic attraction between two oppositely charged ions."
    },
    {
        question: "What is a covalent bond?",
        answer: "A chemical bond that involves the sharing of electron pairs between atoms."
    },
    {
        question: "What is VSEPR theory?",
        answer: "Valence Shell Electron Pair Repulsion theory is a model used to predict the geometry of individual molecules from the number of electron pairs surrounding their central atoms."
    },
    {
        question: "What is hybridization?",
        answer: "The concept of mixing atomic orbitals into new hybrid orbitals suitable for the pairing of electrons to form chemical bonds in valence bond theory."
    },
    {
        question: "What is a sigma (σ) bond?",
        answer: "The strongest type of covalent chemical bond. It is formed by head-on overlapping between atomic orbitals."
    },
    {
        question: "What is a pi (π) bond?",
        answer: "A type of covalent bond that exists in molecules with double or triple bonds, formed by the lateral or sideways overlap of atomic orbitals."
    },
    {
        question: "What is hydrogen bonding?",
        answer: "A special type of dipole-dipole interaction between a hydrogen atom in a polar bond (e.g., N-H, O-H, F-H) and an electronegative atom (N, O, or F)."
    },
    {
        question: "Define electronegativity.",
        answer: "A measure of the tendency of an atom to attract a bonding pair of electrons."
    }
];
