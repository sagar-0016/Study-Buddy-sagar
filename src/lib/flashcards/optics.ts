
import type { Flashcard } from '../types';

export const opticsFlashcards: Omit<Flashcard, 'id'>[] = [
    {
        question: "What is the law of reflection?",
        answer: "The angle of incidence is equal to the angle of reflection."
    },
    {
        question: "What is Snell's Law?",
        answer: "A formula used to describe the relationship between the angles of incidence and refraction, when referring to light or other waves passing through a boundary between two different isotropic media. n₁sin(θ₁) = n₂sin(θ₂)."
    },
    {
        question: "What is total internal reflection?",
        answer: "A phenomenon that occurs when a propagating wave strikes a medium boundary at an angle larger than a particular critical angle with respect to the normal to the surface."
    },
    {
        question: "What is diffraction?",
        answer: "The bending of waves as they pass around an obstacle or through an aperture."
    },
    {
        question: "What is interference of light?",
        answer: "A phenomenon in which two waves superpose to form a resultant wave of greater, lower, or the same amplitude."
    },
    {
        question: "What is polarization of light?",
        answer: "A property applying to transverse waves that specifies the geometrical orientation of the oscillations."
    },
    {
        question: "What is the lens maker's formula?",
        answer: "1/f = (n-1) * (1/R₁ - 1/R₂), where f is the focal length, n is the refractive index, and R₁ and R₂ are the radii of curvature of the lens surfaces."
    },
    {
        question: "What is chromatic aberration?",
        answer: "A failure of a lens to focus all colors to the same point."
    }
];
