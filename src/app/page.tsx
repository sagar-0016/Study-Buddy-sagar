import type { Metadata } from 'next';
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
      <div className="grid grid-cols-1 gap-6">
        <CurrentTask />
        <MotivationCorner />
        <QuickStats />
      </div>
    </div>
  );
}
