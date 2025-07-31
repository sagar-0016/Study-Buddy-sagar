import type { Metadata } from 'next';
import ScheduleEditor from '@/components/planner/schedule-editor';

export const metadata: Metadata = {
  title: 'Study Planner',
};

export default function PlannerPage() {
  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-2xl font-bold tracking-tight">Study Planner</h1>
        <p className="text-muted-foreground">
          View and edit your schedules for holiday and coaching days.
        </p>
      </div>
      <ScheduleEditor />
    </div>
  );
}
