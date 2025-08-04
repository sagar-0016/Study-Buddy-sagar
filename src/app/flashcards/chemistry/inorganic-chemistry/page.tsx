
import type { Metadata } from 'next';
import GenericDeck from '@/components/flashcards/generic-deck';

export const metadata: Metadata = {
  title: 'Inorganic Chemistry Flashcards',
};

export default function InorganicChemistryFlashcardsPage() {
  return (
    <div className="container mx-auto py-4 sm:py-6 lg:py-8">
      <GenericDeck 
        deckId="inorganic-chemistry"
        deckName="Inorganic Chemistry"
        deckDescription="Study the properties and behavior of inorganic compounds."
        backLink="/flashcards/chemistry"
        backLinkText="Back to Chemistry"
      />
    </div>
  );
}
