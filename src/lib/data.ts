import type { Syllabus, ChartData, BarChartData } from './types';

export const syllabusData: Syllabus = {
  physics: {
    label: 'Physics',
    chapters: [
      {
        title: 'Mechanics',
        topics: [
          { name: 'Physics and Measurement', weightage: 3 },
          { name: 'Kinematics', weightage: 5 },
          { name: 'Laws of Motion', weightage: 4 },
          { name: 'Work, Energy and Power', weightage: 4 },
          { name: 'Rotational Motion', weightage: 5 },
          { name: 'Gravitation', weightage: 3 },
          { name: 'Properties of Solids and Liquids', weightage: 2 },
        ],
      },
      {
        title: 'Thermodynamics',
        topics: [
          { name: 'Thermodynamics', weightage: 5 },
          { name: 'Kinetic Theory of Gases', weightage: 2 },
        ],
      },
      {
        title: 'Oscillations & Waves',
        topics: [{ name: 'Oscillations and Waves', weightage: 4 }],
      },
      {
        title: 'Electrostatics & Magnetism',
        topics: [
            { name: 'Electrostatics', weightage: 5 },
            { name: 'Current Electricity', weightage: 5 },
            { name: 'Capacitors', weightage: 3 },
            { name: 'Magnetic Effect of Current', weightage: 4 },
            { name: 'Magnetism', weightage: 2 },
            { name: 'Electromagnetic Induction', weightage: 4 },
            { name: 'Alternating Current', weightage: 3 },
        ]
      },
      {
        title: 'Optics & Modern Physics',
        topics: [
            { name: 'Geometrical Optics', weightage: 4 },
            { name: 'Electromagnetic Waves', weightage: 2 },
            { name: 'Waves Optics', weightage: 3 },
            { name: 'Modern Physics', weightage: 5 },
            { name: 'Errors and Instruments', weightage: 1 },
            { name: 'Semiconductors', weightage: 3 }
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
          { name: 'Some Basic Concepts in Chemistry', weightage: 3 },
          { name: 'States of Matter', weightage: 2 },
          { name: 'Atomic Structure', weightage: 4 },
          { name: 'Chemical Bonding and Molecular Structure', weightage: 5 },
          { name: 'Chemical Thermodynamics', weightage: 4 },
          { name: 'Solutions', weightage: 3 },
          { name: 'Equilibrium', weightage: 4 },
          { name: 'Redox Reactions and Electrochemistry', weightage: 2 },
          { name: 'Chemical Kinetics', weightage: 3 },
        ],
      },
       {
        title: 'Physical Chemistry II',
        topics: [
          { name: 'Liquid Solution', weightage: 4 },
          { name: 'Electrochemistry', weightage: 4 },
          { name: 'Solid State', weightage: 2 },
          { name: 'Surface Chemistry', weightage: 1 },
          { name: 'Chemical Kinetics', weightage: 3 },
        ],
      },
      {
        title: 'Inorganic Chemistry',
        topics: [
          { name: 'Classification of Elements and Periodicity in Properties', weightage: 3 },
          { name: 'Hydrogen', weightage: 1 },
          { name: 's-Block Elements', weightage: 2 },
          { name: 'p-Block Elements', weightage: 5 },
          { name: 'd and f-Block Elements', weightage: 4 },
          { name: 'Coordination Compounds', weightage: 5 },
          { name: 'Environmental Chemistry', weightage: 1 },
          { name: 'General Principles and Processes of Isolation of Metals (Metallurgy)', weightage: 2 },
          { name: 'Qualitative Analysis (SALT ANALYSIS)', weightage: 3 },
        ],
      },
      {
        title: 'Organic Chemistry',
        topics: [
          { name: 'Purification and Characterization of Organic Compounds', weightage: 1 },
          { name: 'Some Basic Principles of Organic Chemistry', weightage: 5 },
          { name: 'Hydrocarbons', weightage: 4 },
          { name: 'Organic Compounds Containing Halogens (Haloalkanes, Grignard\'s Reagent, Reduction, Oxidation)', weightage: 3 },
          { name: 'Organic Compounds Containing Oxygen (Alcohols and Ethers)', weightage: 4 },
          { name: 'Organic Compounds Containing Nitrogen (Aromatic Compound, Carbonyl Compound, Carboxylic Acid and Derivatives)', weightage: 4 },
          { name: 'Biomolecules', weightage: 2 },
          { name: 'Polymers', weightage: 2 },
          { name: 'Chemistry in Everyday Life', weightage: 1 },
          { name: 'Principles Related to Practical Chemistry (POC)', weightage: 1 },
          { name: 'Reaction Mechanism', weightage: 5 },
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
          { name: 'Sets, Relations and Functions', weightage: 3 },
          { name: 'Complex Numbers and Quadratic Equations', weightage: 4 },
          { name: 'Matrices and Determinants', weightage: 4 },
          { name: 'Permutations and Combinations', weightage: 3 },
          { name: 'Mathematical Induction', weightage: 1 },
          { name: 'Binomial Theorem and its Simple Applications', weightage: 3 },
          { name: 'Sequences and Series', weightage: 4 },
        ],
      },
       {
        title: 'Calculus',
        topics: [
          { name: 'Limits, Continuity and Differentiability', weightage: 5 },
          { name: 'Integral Calculus (Indefinite & Definite Integration)', weightage: 5 },
          { name: 'Differential Equations', weightage: 4 },
          { name: 'Methods of Differentiation', weightage: 3 },
          { name: 'Tangent and Normal', weightage: 2 },
          { name: 'Monotonicity', weightage: 2 },
          { name: 'Maxima and Minima', weightage: 3 },
          { name: 'Area Under The Curve', weightage: 3 },
        ],
      },
       {
        title: 'Coordinate Geometry',
        topics: [
          { name: 'Straight Lines', weightage: 4 },
          { name: 'Circles', weightage: 3 },
          { name: 'Conic Sections', weightage: 5 },
          { name: 'Three Dimensional Geometry', weightage: 4 },
          { name: 'Vector Algebra', weightage: 4 },
        ],
      },
      {
        title: 'Trigonometry & Probability',
        topics: [
          { name: 'Trigonometrical Ratios and Identities', weightage: 2 },
          { name: 'Trigonometric Equations', weightage: 3 },
          { name: 'Inverse Trigonometric Functions', weightage: 2 },
          { name: 'Heights and Distances', weightage: 1 },
          { name: 'Statistics and Probability', weightage: 4 },
          { name: 'Mathematical Reasoning', weightage: 1 },
        ],
      },
      {
        title: 'Advanced Topics',
        topics: [
            { name: 'Relation, Function, Inverse Trigonometric Function', weightage: 3 },
            { name: 'Matrices', weightage: 4 },
            { name: 'Probability', weightage: 4 },
            { name: 'Complex Numbers', weightage: 4 }
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
