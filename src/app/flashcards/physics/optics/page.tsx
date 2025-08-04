
import type { Metadata } from 'next';
import GenericDeck from '@/components/flashcards/generic-deck';

export const metadata: Metadata = {
  title: 'Optics Flashcards',
};

export default function OpticsFlashcardsPage() {
  return (
    <div className="container mx-auto py-4 sm:py-6 lg:py-8">
      <GenericDeck 
        deckId="optics"
        deckName="Optics"
        deckDescription="Study the behavior of light, from reflection to refraction."
        backLink="/flashcards/physics"
        backLinkText="Back to Physics"
      />
    </div>
  );
}
