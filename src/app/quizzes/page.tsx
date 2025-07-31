import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClipboardList } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Practice Quizzes',
};

export default function QuizzesPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="mx-auto bg-primary/10 p-4 rounded-full">
            <ClipboardList className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="mt-4">Practice Quizzes Coming Soon!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Get ready to test your knowledge with topic-wise practice quizzes and get instant feedback. This feature is under construction.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
