import type { Metadata } from 'next';
import { Card } from '@/components/ui/card';
import { Book, Target } from 'lucide-react';
import WelcomeBanner from '@/components/home/welcome-banner';
import MotivationCorner from '@/components/home/motivation-corner';
import CurrentTask from '@/components/home/current-task';
import QuickStats from '@/components/home/quick-stats';

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
        <QuickStats />
      </div>
    </div>
  );
}
