import type { Metadata } from 'next';
import PyqTracker from '@/components/syllabus/pyq-tracker';

export const metadata: Metadata = {
  title: 'PYQ Tracker',
};

export default function PyqPage() {
  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-2xl font-bold tracking-tight">PYQ Tracker</h1>
        <p className="text-muted-foreground">
          Track your progress on Previous Year Questions for each topic.
        </p>
      </div>
      <PyqTracker />
    </div>
  );
}
