
import type { Metadata } from 'next';
import GenericDeck from '@/components/flashcards/generic-deck';

export const metadata: Metadata = {
  title: 'Forces & Newton\'s Laws Flashcards',
};

export default function ForcesFlashcardsPage() {
  return (
    <div className="container mx-auto py-4 sm:py-6 lg:py-8">
       <GenericDeck 
        deckId="forces"
        deckName="Forces & Newton's Laws"
        deckDescription="Master the principles of force and motion."
        backLink="/flashcards/physics"
        backLinkText="Back to Physics"
      />
    </div>
  );
}
