
import type { Metadata } from 'next';
import WelcomeBanner from '@/components/home/welcome-banner';
import MotivationCorner from '@/components/home/motivation-corner';
import CurrentTask from '@/components/home/current-task';
import QuickStats from '@/components/home/quick-stats';
import TipOfTheDay from '@/components/home/tip-of-the-day';

export const metadata: Metadata = {
  title: 'Home',
};

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <WelcomeBanner />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <CurrentTask />
        </div>
        <div className="space-y-6">
            <MotivationCorner />
            <TipOfTheDay />
            <QuickStats />
        </div>
      </div>
    </div>
  );
}
