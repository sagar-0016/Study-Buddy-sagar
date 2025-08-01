
"use client";

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Atom, Zap, Thermometer, Orbit, Waves } from 'lucide-react';

const physicsDecks = [
    {
        title: 'Mechanics',
        description: 'Understand motion, forces, and energy, from kinematics to rotational dynamics.',
        icon: Orbit,
        status: 'coming-soon',
        difficulty: 'Advanced',
        href: '/flashcards/not-for-you',
    },
    {
        title: 'Thermodynamics',
        description: 'Explore heat, temperature, and the transfer of energy in physical systems.',
        icon: Thermometer,
        status: 'coming-soon',
        difficulty: 'Intermediate',
        href: '/flashcards/not-for-you',
    },
    {
        title: 'Electricity & Magnetism',
        description: 'Delve into electric circuits, magnetic fields, and electromagnetic waves.',
        icon: Zap,
        status: 'coming-soon',
        difficulty: 'Advanced',
        href: '/flashcards/not-for-you',
    },
    {
        title: 'Optics',
        description: 'Study the behavior of light, from reflection and refraction to wave optics.',
        icon: Waves,
        status: 'coming-soon',
        difficulty: 'Intermediate',
        href: '/flashcards/not-for-you',
    },
     {
        title: 'Modern Physics',
        description: 'Grasp the concepts of relativity, quantum mechanics, and nuclear physics.',
        icon: Atom,
        status: 'coming-soon',
        difficulty: 'Advanced',
        href: '/flashcards/not-for-you',
    },
];

const DifficultyBadge = ({ difficulty }: { difficulty: string }) => {
    const getDifficultyClass = () => {
        switch (difficulty.toLowerCase()) {
            case 'basic': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
            case 'intermediate': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
            case 'advanced': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
            default: return 'bg-muted text-muted-foreground';
        }
    }
    return (
         <Badge className={`mt-4 font-semibold ${getDifficultyClass()}`}>{difficulty}</Badge>
    )
}


const DeckCard = ({ deck }: { deck: (typeof physicsDecks)[0] }) => {
  return (
    <Link href={deck.href}>
        <Card className="flex flex-col h-full transition-all duration-300 hover:border-primary hover:-translate-y-1 hover:shadow-lg">
        <CardHeader className="flex-row items-start justify-between">
            <div className="p-3 rounded-full bg-primary/10 text-primary">
                <deck.icon className="w-8 h-8" />
            </div>
             <Badge variant="outline">Coming Soon</Badge>
        </CardHeader>
        <CardContent className="flex flex-col flex-grow">
            <CardTitle className="text-xl mb-2">{deck.title}</CardTitle>
            <CardDescription className="flex-grow">{deck.description}</CardDescription>
            <DifficultyBadge difficulty={deck.difficulty} />
        </CardContent>
        </Card>
    </Link>
  );
};

export default function PhysicsDeck() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Physics Flashcards</h1>
        <p className="text-muted-foreground">
          Select a chapter to begin your study session.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {physicsDecks.map((deck) => (
            <DeckCard key={deck.title} deck={deck} />
        ))}
      </div>
      <div className="text-center pt-4">
        <Link href="/flashcards" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to all subjects
        </Link>
      </div>
    </div>
  );
}
