import type { Syllabus, ChartData, BarChartData } from './types';

export const syllabusData: Syllabus = {
  physics: {
    label: 'Physics',
    chapters: [
      {
        title: 'Mechanics',
        topics: [
          'Physics and Measurement',
          'Kinematics',
          'Laws of Motion',
          'Work, Energy and Power',
          'Rotational Motion',
          'Gravitation',
          'Properties of Solids and Liquids',
        ],
      },
      {
        title: 'Thermodynamics',
        topics: [
          'Thermodynamics',
          'Kinetic Theory of Gases',
        ],
      },
      {
        title: 'Oscillations & Waves',
        topics: ['Oscillations and Waves'],
      },
      {
        title: 'Electrostatics & Magnetism',
        topics: [
            'Electrostatics',
            'Current Electricity',
            'Capacitors',
            'Magnetic Effect of Current',
            'Magnetism',
            'Electromagnetic Induction',
            'Alternating Current',
        ]
      },
      {
        title: 'Optics & Modern Physics',
        topics: [
            'Geometrical Optics',
            'Electromagnetic Waves',
            'Waves Optics',
            'Modern Physics',
            'Errors and Instruments',
            'Semiconductors'
        ]
      }
    ],
  },
  chemistry: {
    label: 'Chemistry',
    chapters: [
      {
        title: 'Physical Chemistry I',
        topics: [
          'Some Basic Concepts in Chemistry',
          'States of Matter',
          'Atomic Structure',
          'Chemical Bonding and Molecular Structure',
          'Chemical Thermodynamics',
          'Solutions',
          'Equilibrium',
          'Redox Reactions and Electrochemistry',
          'Chemical Kinetics',
        ],
      },
       {
        title: 'Physical Chemistry II',
        topics: [
          'Liquid Solution',
          'Electrochemistry',
          'Solid State',
          'Surface Chemistry',
          'Chemical Kinetics',
        ],
      },
      {
        title: 'Inorganic Chemistry',
        topics: [
          'Classification of Elements and Periodicity in Properties',
          'Hydrogen',
          's-Block Elements',
          'p-Block Elements',
          'd and f-Block Elements',
          'Coordination Compounds',
          'Environmental Chemistry',
          'General Principles and Processes of Isolation of Metals (Metallurgy)',
          'Qualitative Analysis (SALT ANALYSIS)',
        ],
      },
      {
        title: 'Organic Chemistry',
        topics: [
          'Purification and Characterization of Organic Compounds',
          'Some Basic Principles of Organic Chemistry',
          'Hydrocarbons',
          'Organic Compounds Containing Halogens (Haloalkanes, Grignard\'s Reagent, Reduction, Oxidation)',
          'Organic Compounds Containing Oxygen (Alcohols and Ethers)',
          'Organic Compounds Containing Nitrogen (Aromatic Compound, Carbonyl Compound, Carboxylic Acid and Derivatives)',
          'Biomolecules',
          'Polymers',
          'Chemistry in Everyday Life',
          'Principles Related to Practical Chemistry (POC)',
          'Reaction Mechanism',
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
          'Complex Numbers and Quadratic Equations',
          'Matrices and Determinants',
          'Permutations and Combinations',
          'Mathematical Induction',
          'Binomial Theorem and its Simple Applications',
          'Sequences and Series',
        ],
      },
       {
        title: 'Calculus',
        topics: [
          'Limits, Continuity and Differentiability',
          'Integral Calculus (Indefinite & Definite Integration)',
          'Differential Equations',
          'Methods of Differentiation',
          'Tangent and Normal',
          'Monotonicity',
          'Maxima and Minima',
          'Area Under The Curve',
        ],
      },
       {
        title: 'Coordinate Geometry',
        topics: [
          'Straight Lines',
          'Circles',
          'Conic Sections',
          'Three Dimensional Geometry',
          'Vector Algebra',
        ],
      },
      {
        title: 'Trigonometry & Probability',
        topics: [
          'Trigonometrical Ratios and Identities',
          'Trigonometric Equations',
          'Inverse Trigonometric Functions',
          'Heights and Distances',
          'Statistics and Probability',
          'Mathematical Reasoning',
        ],
      },
      {
        title: 'Advanced Topics',
        topics: [
            'Relation, Function, Inverse Trigonometric Function',
            'Matrices',
            'Probability',
            'Complex Numbers'
        ]
      }
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
