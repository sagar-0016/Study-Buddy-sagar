
import type { Metadata } from 'next';
import GenericDeck from '@/components/flashcards/generic-deck';

export const metadata: Metadata = {
  title: 'Thermodynamics Flashcards',
};

export default function ThermodynamicsFlashcardsPage() {
  return (
    <div className="container mx-auto py-4 sm:py-6 lg:py-8">
      <GenericDeck 
        deckId="thermodynamics"
        deckName="Thermodynamics"
        deckDescription="Explore heat, temperature, and the transfer of energy."
        backLink="/flashcards/physics"
        backLinkText="Back to Physics"
      />
    </div>
  );
}
