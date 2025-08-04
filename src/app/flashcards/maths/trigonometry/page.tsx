
import type { Metadata } from 'next';
import GenericDeck from '@/components/flashcards/generic-deck';

export const metadata: Metadata = {
  title: 'Trigonometry Flashcards',
};

export default function TrigonometryFlashcardsPage() {
  return (
    <div className="container mx-auto py-4 sm:py-6 lg:py-8">
      <GenericDeck 
        deckId="trigonometry"
        deckName="Trigonometry"
        deckDescription="Master sine, cosine, tangent and their applications."
        backLink="/flashcards/maths"
        backLinkText="Back to Maths"
      />
    </div>
  );
}
