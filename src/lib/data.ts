import type { Syllabus, ChartData, BarChartData } from './types';

export const syllabusData: Syllabus = {
  physics: {
    label: 'Physics',
    chapters: [
      {
        title: 'Mechanics',
        topics: [
          'Kinematics',
          'Laws of Motion',
          'Work, Energy and Power',
          'Rotational Motion',
          'Gravitation',
        ],
      },
      {
        title: 'Thermodynamics',
        topics: [
          'Thermal Properties of Matter',
          'Thermodynamics',
          'Kinetic Theory',
        ],
      },
      {
        title: 'Electricity & Magnetism',
        topics: [
          'Electrostatics',
          'Current Electricity',
          'Magnetic Effects of Current',
          'Electromagnetic Induction & AC',
        ],
      },
       {
        title: 'Optics',
        topics: [
          'Ray Optics',
          'Wave Optics',
        ],
      },
    ],
  },
  chemistry: {
    label: 'Chemistry',
    chapters: [
      {
        title: 'Physical Chemistry',
        topics: [
          'Some Basic Concepts of Chemistry',
          'Structure of Atom',
          'States of Matter',
          'Chemical Thermodynamics',
          'Equilibrium',
          'Redox Reactions',
          'Solid State',
          'Solutions',
          'Electrochemistry',
          'Chemical Kinetics',
          'Surface Chemistry'
        ],
      },
      {
        title: 'Inorganic Chemistry',
        topics: [
          'Classification of Elements and Periodicity',
          'Chemical Bonding',
          'Hydrogen',
          's-Block Elements',
          'p-Block Elements',
          'd and f Block Elements',
          'Coordination Compounds',
        ],
      },
      {
        title: 'Organic Chemistry',
        topics: [
          'Basic Principles and Techniques',
          'Hydrocarbons',
          'Haloalkanes and Haloarenes',
          'Alcohols, Phenols and Ethers',
          'Aldehydes, Ketones and Carboxylic Acids',
          'Amines',
          'Biomolecules',
          'Polymers'
        ],
      },
    ],
  },
  maths: {
    label: 'Maths',
    chapters: [
      {
        title: 'Algebra',
        topics: [
          'Sets, Relations and Functions',
          'Complex Numbers',
          'Quadratic Equations',
          'Matrices and Determinants',
          'Permutations and Combinations',
          'Binomial Theorem',
          'Sequences and Series',
        ],
      },
       {
        title: 'Calculus',
        topics: [
          'Limits and Derivatives',
          'Continuity and Differentiability',
          'Applications of Derivatives',
          'Integrals',
          'Applications of Integrals',
          'Differential Equations',
        ],
      },
       {
        title: 'Coordinate Geometry',
        topics: [
          'Straight Lines',
          'Conic Sections',
          'Three Dimensional Geometry',
        ],
      },
        {
        title: 'Vector and 3D Geometry',
        topics: [
          'Vectors',
          'Three Dimensional Geometry',
        ],
      },
    ],
  },
};

export const progressChartData: ChartData = [
  { month: 'Jan', completed: 10 },
  { month: 'Feb', completed: 25 },
  { month: 'Mar', completed: 45 },
  { month: 'Apr', completed: 60 },
  { month: 'May', completed: 75 },
  { month: 'Jun', completed: 85 },
];

export const quizScoresData: BarChartData = [
    { subject: 'Physics', score: 75 },
    { subject: 'Chemistry', score: 82 },
    { subject: 'Maths', score: 68 },
];

export const completionData: ChartData = [
  { subject: 'Physics', value: 60, fill: "var(--color-chart-1)" },
  { subject: 'Chemistry', value: 80, fill: "var(--color-chart-2)" },
  { subject: 'Maths', value: 45, fill: "var(--color-chart-3)" },
];

export const quizHistoryForFeedback = `
- Topic: Kinematics, Score: 65%
- Topic: Chemical Bonding, Score: 85%
- Topic: Quadratic Equations, Score: 90%
- Topic: Thermodynamics, Score: 55%
- Topic: Organic Chemistry - Basic Principles, Score: 70%
- Topic: Integrals, Score: 95%
- Topic: Rotational Motion, Score: 60%
`;
