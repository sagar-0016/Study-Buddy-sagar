
import type { Flashcard } from '../types';

export const geometryFlashcards: Omit<Flashcard, 'id'>[] = [
    {
        question: "What is the Pythagorean theorem?",
        answer: "In a right-angled triangle, the square of the length of the hypotenuse (the side opposite the right angle) is equal to the sum of the squares of the lengths of the other two sides. a² + b² = c²."
    },
    {
        question: "What is the formula for the area of a circle?",
        answer: "The area A of a circle is given by the formula A = πr², where r is the radius."
    },
    {
        question: "What is the formula for the circumference of a circle?",
        answer: "The circumference C of a circle is given by the formula C = 2πr or C = πd, where r is the radius and d is the diameter."
    },
    {
        question: "What is the sum of the angles in a triangle?",
        answer: "The sum of the interior angles of a triangle is always 180 degrees."
    },
    {
        question: "What defines a parallelogram?",
        answer: "A quadrilateral with two pairs of parallel sides."
    },
    {
        question: "What is the formula for the volume of a sphere?",
        answer: "The volume V of a sphere is given by the formula V = (4/3)πr³, where r is the radius."
    },
    {
        question: "What is the equation of a straight line in slope-intercept form?",
        answer: "The equation is y = mx + c, where m is the slope and c is the y-intercept."
    },
    {
        question: "What are similar triangles?",
        answer: "Triangles that have the same shape but may be different sizes. Their corresponding angles are equal and the ratio of their corresponding sides are equal."
    }
];
