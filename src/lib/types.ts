
import { DocumentData, Timestamp } from 'firebase/firestore';

export type NavLink = {
  href: string;
  label: string;
  icon: React.ElementType;
};

export type Chapter = {
  title: string;
  topics: string[];
};

export type Subject = {
  label: string;
  chapters: Chapter[];
};

export type Syllabus = {
  physics: Subject;
  chemistry: Subject;
  maths: Subject;
};

export type ChartData = {
  [key: string]: string | number;
}[];

export type BarChartData = {
  subject: string;
  score: number;
}[];

export type ScheduleTask = {
  time: string;
  task: string;
};

export type Schedule = {
  type: 'holiday' | 'coaching';
  tasks: ScheduleTask[];
};

export type DayType = 'holiday' | 'coaching';

export type LateNightMessageCollection = '12amto2am' | '2amto5am' | '5amto6am';

export interface Question extends DocumentData {
  id: string;
  questionText: string;
  questionImageURL?: string;
  answerType: 'options' | 'text';
  options?: string[];
  correctAnswer: string;
  isAttempted: boolean;
  subject: string;
  userAnswer?: string;
  isCorrect?: boolean;
}

export type Flashcard = {
    id: number;
    question: string;
    answer: string;
};

export type ProgressData = {
  id: string;
  completed: number;
  total: number;
  subject: string;
};

export type SyllabusTopic = {
  id: string;
  completed: boolean;
};

export interface RevisionTopic extends DocumentData {
  id: string;
  subject: string;
  chapterName: string;
  topicName: string;
  hints: string;
  hintsImageURL?: string;
  recallSuccess: number;
  recallFails: number;
  lastReviewed: Timestamp;
}

export type PyqProgress = {
  id: string;
  completed: boolean;
};
