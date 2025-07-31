import type { Metadata } from 'next';
import ProgressCharts from '@/components/dashboard/progress-charts';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Performance Dashboard</h1>
        <p className="text-muted-foreground">
          Visualize your journey and track your progress.
        </p>
      </div>
      <ProgressCharts />
    </div>
  );
}
