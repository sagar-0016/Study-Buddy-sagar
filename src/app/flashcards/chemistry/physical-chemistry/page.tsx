
import type { Metadata } from 'next';
import GenericDeck from '@/components/flashcards/generic-deck';

export const metadata: Metadata = {
  title: 'Physical Chemistry Flashcards',
};

export default function PhysicalChemistryFlashcardsPage() {
  return (
    <div className="container mx-auto py-4 sm:py-6 lg:py-8">
      <GenericDeck 
        deckId="physical-chemistry"
        deckName="Physical Chemistry"
        deckDescription="Explore the fundamental principles governing chemical systems."
        backLink="/flashcards/chemistry"
        backLinkText="Back to Chemistry"
      />
    </div>
  );
}
