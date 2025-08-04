
import type { Metadata } from 'next';
import GenericDeck from '@/components/flashcards/generic-deck';

export const metadata: Metadata = {
  title: 'Algebra Basics Flashcards',
};

export default function AlgebraFlashcardsPage() {
  return (
    <div className="container mx-auto py-4 sm:py-6 lg:py-8">
      <GenericDeck 
        deckId="algebra"
        deckName="Algebra Basics"
        deckDescription="Master fundamental algebraic concepts."
        backLink="/flashcards/maths"
        backLinkText="Back to Maths"
      />
    </div>
  );
}
