
import type { Metadata } from 'next';
import GenericDeck from '@/components/flashcards/generic-deck';

export const metadata: Metadata = {
  title: 'Geometry Fundamentals Flashcards',
};

export default function GeometryFlashcardsPage() {
  return (
    <div className="container mx-auto py-4 sm:py-6 lg:py-8">
      <GenericDeck 
        deckId="geometry"
        deckName="Geometry Fundamentals"
        deckDescription="Explore shapes, angles, and theorems."
        backLink="/flashcards/maths"
        backLinkText="Back to Maths"
      />
    </div>
  );
}
