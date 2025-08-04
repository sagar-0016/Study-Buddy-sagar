
import type { Metadata } from 'next';
import GenericDeck from '@/components/flashcards/generic-deck';

export const metadata: Metadata = {
  title: 'Chemical Bonding Flashcards',
};

export default function ChemicalBondingFlashcardsPage() {
  return (
    <div className="container mx-auto py-4 sm:py-6 lg:py-8">
      <GenericDeck 
        deckId="chemical-bonding"
        deckName="Chemical Bonding"
        deckDescription="Understand the forces that hold atoms together."
        backLink="/flashcards/chemistry"
        backLinkText="Back to Chemistry"
      />
    </div>
  );
}
