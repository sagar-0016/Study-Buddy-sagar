
import type { Metadata } from 'next';
import GenericDeck from '@/components/flashcards/generic-deck';

export const metadata: Metadata = {
  title: 'Stoichiometry Flashcards',
};

export default function StoichiometryFlashcardsPage() {
  return (
    <div className="container mx-auto py-4 sm:py-6 lg:py-8">
      <GenericDeck 
        deckId="stoichiometry"
        deckName="Stoichiometry"
        deckDescription="Master quantitative relationships in chemical reactions."
        backLink="/flashcards/chemistry"
        backLinkText="Back to Chemistry"
      />
    </div>
  );
}
