
import type { Flashcard } from '../types';

export const statsProbabilityFlashcards: Omit<Flashcard, 'id'>[] = [
    {
        question: "What is probability?",
        answer: "A measure of the likelihood that an event will occur, expressed as a number between 0 and 1."
    },
    {
        question: "What is the formula for calculating the probability of an event?",
        answer: "P(A) = (Number of favorable outcomes) / (Total number of possible outcomes)."
    },
    {
        question: "What is Bayes' theorem?",
        answer: "A mathematical formula for determining conditional probability. It describes the probability of an event, based on prior knowledge of conditions that might be related to the event."
    },
    {
        question: "What is the mean of a data set?",
        answer: "The average of the numbers in the data set, calculated by summing the numbers and dividing by the count of numbers."
    },
    {
        question: "What is the median of a data set?",
        answer: "The middle value in a data set that is arranged in ascending order."
    },
    {
        question: "What is the mode of a data set?",
        answer: "The value that appears most frequently in a data set."
    },
    {
        question: "What is standard deviation?",
        answer: "A measure of the amount of variation or dispersion of a set of values."
    },
    {
        question: "What is a random variable?",
        answer: "A variable whose value is a numerical outcome of a random phenomenon."
    }
];
