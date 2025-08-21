
import type { Metadata } from 'next';
import BrainstormingPage from '@/components/brainstorming/brainstorming-page';

export const metadata: Metadata = {
  title: 'Brainstorming',
};

export default function Brainstorming() {
  return (
    <div className="space-y-6">
       <div>
        <h1 className="text-2xl font-bold tracking-tight">Brainstorming</h1>
        <p className="text-muted-foreground">
          Think through complex problems and jot down your own questions to ponder.
        </p>
      </div>
      <BrainstormingPage />
    </div>
  );
}
