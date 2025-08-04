
import type { Metadata } from 'next';
import GenericDeck from '@/components/flashcards/generic-deck';

export const metadata: Metadata = {
  title: 'Modern Physics Flashcards',
};

export default function ModernPhysicsFlashcardsPage() {
  return (
    <div className="container mx-auto py-4 sm:py-6 lg:py-8">
      <GenericDeck 
        deckId="modern-physics"
        deckName="Modern Physics"
        deckDescription="Grasp the concepts of relativity and quantum mechanics."
        backLink="/flashcards/physics"
        backLinkText="Back to Physics"
      />
    </div>
  );
}
