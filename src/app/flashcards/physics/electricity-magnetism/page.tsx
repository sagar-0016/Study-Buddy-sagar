
import type { Metadata } from 'next';
import GenericDeck from '@/components/flashcards/generic-deck';

export const metadata: Metadata = {
  title: 'Electricity & Magnetism Flashcards',
};

export default function ElectricityMagnetismFlashcardsPage() {
  return (
    <div className="container mx-auto py-4 sm:py-6 lg:py-8">
      <GenericDeck 
        deckId="electricity-magnetism"
        deckName="Electricity & Magnetism"
        deckDescription="Delve into electric circuits and magnetic fields."
        backLink="/flashcards/physics"
        backLinkText="Back to Physics"
      />
    </div>
  );
}
