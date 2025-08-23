
import type { Metadata } from 'next';
import GenericDeck from '@/components/flashcards/generic-deck';
import { getFlashcardDeckById } from '@/lib/flashcards';
import { notFound } from 'next/navigation';
import { capitalize } from '@/lib/utils';

interface FlashcardPageProps {
  params: {
    category: string;
    deckId: string;
  };
}

export async function generateMetadata({ params }: FlashcardPageProps): Promise<Metadata> {
  const deck = await getFlashcardDeckById(params.deckId);

  if (!deck) {
    return {
      title: 'Deck Not Found',
    };
  }

  return {
    title: `${deck.title} Flashcards`,
  };
}


export default async function FlashcardPage({ params }: FlashcardPageProps) {
  const deck = await getFlashcardDeckById(params.deckId);

  if (!deck) {
    notFound();
  }

  return (
    <div className="container mx-auto py-4 sm:py-6 lg:py-8">
      <GenericDeck 
        deckId={params.deckId}
        deckName={deck.title}
        deckDescription={deck.description}
        backLink={`/flashcards/${params.category}`}
        backLinkText={`Back to ${capitalize(params.category)}`}
      />
    </div>
  );
}
