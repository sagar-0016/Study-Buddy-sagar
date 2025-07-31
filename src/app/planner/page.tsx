import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarClock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Study Planner',
};

export default function PlannerPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="mx-auto bg-primary/10 p-4 rounded-full">
            <CalendarClock className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="mt-4">Study Planner Coming Soon!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            We're working hard to bring you a powerful tool to schedule your study and revision sessions. Stay tuned!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
