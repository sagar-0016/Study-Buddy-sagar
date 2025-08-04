
import type { Flashcard } from '../types';

export const gocFlashcards: Omit<Flashcard, 'id'>[] = [
    {
        question: "What is the inductive effect?",
        answer: "The permanent displacement of shared electron pair in a carbon chain towards the more electronegative atom or group."
    },
    {
        question: "What is resonance?",
        answer: "A way of describing delocalized electrons within certain molecules or polyatomic ions where the bonding cannot be expressed by a single Lewis structure."
    },
    {
        question: "What is hyperconjugation?",
        answer: "The delocalization of σ-electrons of a C-H bond of an alkyl group directly attached to an atom of an unsaturated system or to an atom with an unshared p-orbital."
    },
    {
        question: "What is a carbocation?",
        answer: "An ion with a positively charged carbon atom. Carbocations are generally unstable because they do not have a full octet of electrons."
    },
    {
        question: "What is a carbanion?",
        answer: "An ion with a negatively charged carbon atom. They have a lone pair of electrons and are typically trigonal pyramidal."
    },
    {
        question: "What is an electrophile?",
        answer: "A reagent that is attracted to electrons. They are positively charged or neutral species having vacant orbitals."
    },
    {
        question: "What is a nucleophile?",
        answer: "A reagent that brings an electron pair. They are electron-rich species, either negatively charged or having a lone pair of electrons."
    },
    {
        question: "What are tautomers?",
        answer: "Structural isomers of chemical compounds that readily interconvert. The chemical reaction interconverting the two is called tautomerization."
    },
    {
        question: "What is the difference between conformation and configuration?",
        answer: "Conformations are different spatial arrangements of a molecule that can be interconverted by rotation about single bonds. Configurations are different spatial arrangements that can only be interconverted by breaking and reforming bonds."
    }
];
