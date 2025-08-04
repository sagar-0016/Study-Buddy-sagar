
import type { Metadata } from 'next';
import GenericDeck from '@/components/flashcards/generic-deck';

export const metadata: Metadata = {
  title: 'Calculus II Flashcards',
};

export default function Calculus2FlashcardsPage() {
  return (
    <div className="container mx-auto py-4 sm:py-6 lg:py-8">
      <GenericDeck 
        deckId="calculus2"
        deckName="Calculus II"
        deckDescription="Master integration techniques and series."
        backLink="/flashcards/maths"
        backLinkText="Back to Maths"
      />
    </div>
  );
}
