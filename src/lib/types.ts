
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
