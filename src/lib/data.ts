import type { Syllabus, ChartData, BarChartData } from './types';

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
