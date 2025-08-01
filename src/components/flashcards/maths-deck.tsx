
"use client";

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Sigma, FlaskConical, Atom, BrainCircuit, Rocket, Plus, Minus, Divide, Pi, CaseUpper, Shapes, FunctionSquare, Bot } from 'lucide-react';

const mathDecks = [
    {
        title: 'Algebra Basics',
        description: 'Introduction to variables, expressions, and solving linear equations step by step.',
        icon: CaseUpper,
        status: 'coming-soon',
        difficulty: 'Intermediate',
        href: '/flashcards/not-for-you',
    },
    {
        title: 'Geometry Fundamentals',
        description: 'Explore shapes, angles, area, perimeter, and basic geometric theorems and proofs.',
        icon: Shapes,
        status: 'coming-soon',
        difficulty: 'Intermediate',
        href: '/flashcards/not-for-you',
    },
    {
        title: 'Trigonometry',
        description: 'Master sine, cosine, tangent, and their applications in solving triangles and wave functions.',
        icon: FunctionSquare,
        status: 'coming-soon',
        difficulty: 'Intermediate',
        href: '/flashcards/not-for-you',
    },
    {
        title: 'Calculus I',
        description: 'Learn limits, derivatives, and their applications in optimization and curve analysis.',
        icon: () => <span className="text-3xl">∫</span>,
        status: 'coming-soon',
        difficulty: 'Advanced',
        href: '/flashcards/not-for-you',
    },
     {
        title: 'Calculus II',
        description: 'Master integration techniques, series, and applications of definite integrals.',
        icon: Sigma,
        status: 'coming-soon',
        difficulty: 'Advanced',
        href: '/flashcards/not-for-you',
    },
    {
        title: 'Statistics & Probability',
        description: 'Understand data analysis, probability distributions, and statistical inference.',
        icon: Bot,
        status: 'coming-soon',
        difficulty: 'Intermediate',
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


const DeckCard = ({ deck }: { deck: (typeof mathDecks)[0] }) => {
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

export default function MathsDeck() {
  return (
    <div className="space-y-8">
        <div className="p-8 text-center bg-gradient-to-br from-primary to-accent rounded-lg text-primary-foreground relative overflow-hidden">
             <div className="absolute inset-0 bg-grid-slate-100/[0.05] bg-[bottom_1px_center] dark:bg-grid-slate-400/[0.05] dark:bg-bottom dark:border-b dark:border-slate-100/5 [mask-image:linear-gradient(to_bottom,transparent,white)]"></div>
            <h1 className="text-4xl font-bold">Mathematics</h1>
            <p className="text-lg mt-2 opacity-90 max-w-2xl mx-auto">Master mathematical concepts from basic arithmetic to advanced calculus with our comprehensive flashcard collection.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {mathDecks.map((deck) => (
            <DeckCard key={deck.title} deck={deck} />
        ))}
        </div>
        <div className="text-center">
            <Link href="/flashcards" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to all subjects
            </Link>
        </div>
    </div>
  );
}
