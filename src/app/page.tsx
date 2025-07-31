import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Book, Target } from 'lucide-react';
import WelcomeBanner from '@/components/home/welcome-banner';
import MotivationCorner from '@/components/home/motivation-corner';
import CurrentTask from '@/components/home/current-task';

export const metadata: Metadata = {
  title: 'Home',
};

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <WelcomeBanner />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <MotivationCorner />
        <CurrentTask />
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <Lightbulb className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium">Syllabus Covered</p>
                  <p className="text-lg font-bold">45%</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-accent/10 text-accent">
                  <Book className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium">Quizzes Taken</p>
                  <p className="text-lg font-bold">12</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-destructive/10 text-destructive">
                   <Target className="h-5 w-5" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium">Average Score</p>
                  <p className="text-lg font-bold">78%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
