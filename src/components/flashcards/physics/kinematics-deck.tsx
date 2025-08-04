
"use client";

import type { Metadata } from 'next';
import GenericDeck from '@/components/flashcards/generic-deck';

export default function KinematicsFlashcardsPage() {
  return (
    <div className="container mx-auto py-4 sm:py-6 lg:py-8">
       <GenericDeck 
        deckId="kinematics"
        deckName="Kinematics"
        deckDescription="Review your understanding of motion."
        backLink="/flashcards/physics"
        backLinkText="Back to Physics"
      />
    </div>
  );
}
