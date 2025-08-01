
"use client";

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Beaker, Atom, FlaskConical, Combine, TestTube, Pilcrow } from 'lucide-react';

const chemDecks = [
    {
        title: 'Physical Chemistry',
        description: 'Explore the fundamental principles governing chemical systems, energy, and matter.',
        icon: Atom,
        status: 'coming-soon',
        difficulty: 'Advanced',
        href: '/flashcards/not-for-you',
    },
    {
        title: 'Inorganic Chemistry',
        description: 'Study the properties and behavior of inorganic compounds, including metals and minerals.',
        icon: TestTube,
        status: 'coming-soon',
        difficulty: 'Intermediate',
        href: '/flashcards/not-for-you',
    },
    {
        title: 'Organic Chemistry',
        description: 'Delve into the structure, properties, and reactions of carbon-containing compounds.',
        icon: Combine,
        status: 'coming-soon',
        difficulty: 'Advanced',
        href: '/flashcards/not-for-you',
    },
    {
        title: 'Stoichiometry',
        description: 'Master the quantitative relationships between reactants and products in chemical reactions.',
        icon: Beaker,
        status: 'coming-soon',
        difficulty: 'Basic',
        href: '/flashcards/not-for-you',
    },
     {
        title: 'Chemical Bonding',
        description: 'Understand the forces that hold atoms together to form molecules and compounds.',
        icon: () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-atom"><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m4.93 19.07 1.41-1.41"/><path d="m17.66 6.34 1.41-1.41"/><circle cx="12" cy="12" r="2"/><path d="M12 12c4.42 0 8-3.58 8-8"/><path d="M12 12c-4.42 0-8-3.58-8-8s3.58-8 8-8"/><path d="M12 12c0 4.42-3.58 8-8 8"/><path d="M12 12c0-4.42-3.58-8-8-8s3.58-8 8-8"/></svg>,
        status: 'coming-soon',
        difficulty: 'Intermediate',
        href: '/flashcards/not-for-you',
    },
    {
        title: 'Biochemistry',
        description: 'Explore the chemical processes within and relating to living organisms.',
        icon: Pilcrow,
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


const DeckCard = ({ deck }: { deck: (typeof chemDecks)[0] }) => {
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

export default function ChemistryDeck() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Chemistry Flashcards</h1>
        <p className="text-muted-foreground">
          Select a chapter to begin your study session.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {chemDecks.map((deck) => (
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
