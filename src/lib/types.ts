
import { DocumentData, Timestamp } from 'firebase/firestore';

export type NavLink = {
  href: string;
  label: string;
  icon: React.ElementType;
};

export type SyllabusChapter = {
    name: string;
    jeeMainWeightage: number;
    jeeAdvancedWeightage: number;
}

export type Chapter = {
  title: string;
  topics: SyllabusChapter[];
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
    id: string;
    question: string;
    answer: string;
};

export interface FlashcardDeck extends DocumentData {
    id: string;
    category: 'main' | 'physics' | 'chemistry' | 'maths';
    title: string;
    description: string;
    icon: string;
    status: 'available' | 'coming-soon' | 'not-available' | 'not-for-you';
    href: string;
    difficulty?: 'Basic' | 'Intermediate' | 'Advanced';
}

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

export type SyllabusTopicWithTimestamp = SyllabusTopic & {
  lastUpdated: Timestamp;
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

export type PyqProgressWithTimestamp = PyqProgress & {
    lastUpdated: Timestamp;
};

export interface Lecture extends DocumentData {
  id: string;
  title: string;
  description: string;
  subject: 'Physics' | 'Chemistry' | 'Maths';
  videoUrl: string;
  thumbnailUrl: string;
  channel: string;
  duration: string;
}

export interface Doubt extends DocumentData {
    id: string;
    text: string;
    subject: string;
    imageUrl?: string;
    isAddressed: boolean;
    isCleared: boolean;
    createdAt: Timestamp;
}

export interface TechnicalHelp extends DocumentData {
    id: string;
    text: string;
    category: string;
    imageUrl?: string;
    isAddressed: boolean;
    isCleared: boolean;
    createdAt: Timestamp;
}

export interface BrainstormingTopic extends DocumentData {
    id: string;
    subject: string;
    question: string;
    guideline: string;
}

export interface BrainstormingSubmission extends DocumentData {
    id: string;
    topicId: string;
    topicQuestion: string;
    thoughts: string;
    submittedAt: Timestamp;
}

export interface Message extends DocumentData {
    id: string;
    text: string;
    isRead: boolean;
    createdAt: Timestamp;
}
