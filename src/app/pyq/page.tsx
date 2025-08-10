
import type { Metadata } from 'next';
import PyqTracker from '@/components/syllabus/pyq-tracker';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'PYQ Tracker',
};

export default function PyqPage() {
  return (
    <div className="space-y-6">
       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">PYQ Tracker</h1>
          <p className="text-muted-foreground">
            Track your progress on Previous Year Questions for each topic.
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/syllabus">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Syllabus
          </Link>
        </Button>
      </div>
      <PyqTracker />
    </div>
  );
}
