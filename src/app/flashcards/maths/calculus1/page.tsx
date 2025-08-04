
import type { Metadata } from 'next';
import GenericDeck from '@/components/flashcards/generic-deck';

export const metadata: Metadata = {
  title: 'Calculus I Flashcards',
};

export default function Calculus1FlashcardsPage() {
  return (
    <div className="container mx-auto py-4 sm:py-6 lg:py-8">
      <GenericDeck 
        deckId="calculus1"
        deckName="Calculus I"
        deckDescription="Learn limits, derivatives, and their applications."
        backLink="/flashcards/maths"
        backLinkText="Back to Maths"
      />
    </div>
  );
}
