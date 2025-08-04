
import type { Metadata } from 'next';
import GenericDeck from '@/components/flashcards/generic-deck';

export const metadata: Metadata = {
  title: 'General Organic Chemistry Flashcards',
};

export default function GocFlashcardsPage() {
  return (
    <div className="container mx-auto py-4 sm:py-6 lg:py-8">
      <GenericDeck 
        deckId="goc"
        deckName="General Organic Chemistry"
        deckDescription="Master the fundamental concepts of GOC."
        backLink="/flashcards/chemistry"
        backLinkText="Back to Chemistry"
      />
    </div>
  );
}
