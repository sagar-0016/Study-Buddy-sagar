"use client";

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dna, Sigma, FlaskConical, Atom, Rocket, BrainCircuit } from 'lucide-react';

const decks = [
  {
    title: 'Biology Fundamentals',
    description: 'Dive into the building blocks of life, from cellular structures to complex biological processes.',
    icon: Dna,
    status: 'available',
    href: '/flashcards/biology',
  },
  {
    title: 'Mathematics',
    description: 'Master algebra, geometry, and calculus concepts with interactive problem-solving flashcards.',
    icon: Sigma,
    status: 'available',
    href: '/flashcards/maths',
  },
  {
    title: 'Chemistry Basics',
    description: 'Master the periodic table, chemical reactions, and fundamental principles of chemistry.',
    icon: FlaskConical,
    status: 'available',
    href: '/flashcards/chemistry',
  },
  {
    title: 'Physics Concepts',
    description: 'Understand the fundamental laws that govern our universe, from mechanics to quantum physics.',
    icon: Atom,
    status: 'available',
    href: '/flashcards/physics',
  },
   {
    title: 'AI & Machine Learning',
    description: 'Explore the core concepts of AI, neural networks, and machine learning algorithms.',
    icon: BrainCircuit,
    status: 'available',
    href: '/flashcards/ai',
  },
  {
    title: 'Space & Astronomy',
    description: 'Journey through the cosmos and learn about planets, stars, galaxies, and the mysteries of space.',
    icon: Rocket,
    status: 'coming-soon',
    href: '#',
  },
];

const DeckCard = ({ deck }: { deck: (typeof decks)[0] }) => {
  const isAvailable = deck.status === 'available';
  const CardContentWrapper = isAvailable ? Link : 'div';

  return (
    <Card className={`flex flex-col transition-all duration-300 ${isAvailable ? 'hover:border-primary hover:-translate-y-1 hover:shadow-lg' : 'opacity-70 cursor-not-allowed'}`}>
      <CardContentWrapper href={deck.href} className="flex flex-col flex-grow p-6">
        <CardHeader className="p-0 mb-4">
          <div className="flex justify-between items-start">
            <div className="p-3 rounded-full bg-primary/10 text-primary">
                <deck.icon className="w-8 h-8" />
            </div>
            <Badge variant={isAvailable ? 'default' : 'secondary'}>
              {isAvailable ? 'Available' : 'Coming Soon'}
            </Badge>
          </div>
        </CardHeader>
        <div className="flex flex-col flex-grow">
          <CardTitle className="text-xl mb-2">{deck.title}</CardTitle>
          <CardDescription className="flex-grow">{deck.description}</CardDescription>
        </div>
      </CardContentWrapper>
    </Card>
  );
};

export default function DeckSelection() {
  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {decks.map((deck) => (
        <DeckCard key={deck.title} deck={deck} />
      ))}
    </div>
  );
}
