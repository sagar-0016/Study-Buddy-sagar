
"use client";

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, AlertTriangle, Search, BookOpen, Atom, Wind, Orbit, Magnet, Thermometer, Telescope } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getFlashcardDecks } from '@/lib/flashcards';
import type { FlashcardDeck } from '@/lib/types';
import { Input } from '@/components/ui/input';
import type { LucideProps } from 'lucide-react';

const iconMap: { [key: string]: React.ComponentType<LucideProps> } = {
  Atom,
  Wind,
  Orbit,
  Magnet,
  Thermometer,
  Telescope,
};

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


const DeckCard = ({ deck }: { deck: FlashcardDeck }) => {
  const isAvailable = deck.status === 'available';
  const IconComponent = iconMap[deck.icon] || Atom;

  const cardContent = (
    <Card className={cn("flex flex-col h-full transition-all duration-300", 
        isAvailable ? "hover:border-primary hover:-translate-y-1 hover:shadow-lg cursor-pointer" : "opacity-70 bg-muted/50"
    )}>
        <CardHeader className="flex-row items-start justify-between">
            <div className="p-3 rounded-full bg-primary/10 text-primary">
                <IconComponent className="w-8 h-8" />
            </div>
             <Badge variant={isAvailable ? 'default' : 'outline'}>{isAvailable ? 'Available' : 'Coming Soon'}</Badge>
        </CardHeader>
        <CardContent className="flex flex-col flex-grow">
            <CardTitle className="text-xl mb-2">{deck.title}</CardTitle>
            <CardDescription className="flex-grow">{deck.description}</CardDescription>
            {deck.difficulty && <DifficultyBadge difficulty={deck.difficulty} />}
        </CardContent>
    </Card>
  );

  if (isAvailable) {
    return <Link href={deck.href}>{cardContent}</Link>
  }
  return <div>{cardContent}</div>;
};

export default function PhysicsDeck() {
  const [decks, setDecks] = useState<FlashcardDeck[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
      const fetchDecks = async () => {
          try {
              setIsLoading(true);
              const fetchedDecks = await getFlashcardDecks('physics');
              setDecks(fetchedDecks);
          } catch(err) {
              console.error(err);
              setError("Could not load Physics decks.");
          } finally {
              setIsLoading(false);
          }
      };
      fetchDecks();
  }, []);

  const filteredDecks = useMemo(() => {
    if (!searchTerm) return decks;
    const lowercasedTerm = searchTerm.toLowerCase();
    return decks.filter(deck => 
      deck.title.toLowerCase().includes(lowercasedTerm) ||
      deck.description.toLowerCase().includes(lowercasedTerm)
    );
  }, [decks, searchTerm]);


  const renderContent = () => {
    if (isLoading) {
        return (
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="space-y-3">
                        <Skeleton className="h-48 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                ))}
            </div>
        );
    }
    if (error) {
         return (
            <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg bg-destructive/10 border-destructive">
                <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
                <h3 className="text-lg font-semibold text-destructive-foreground">{error}</h3>
            </div>
        );
    }
    
    if (filteredDecks.length === 0) {
        return (
             <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg min-h-[30vh]">
                <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold">No Decks Found</h3>
                <p className="text-muted-foreground">Try adjusting your search term.</p>
            </div>
        )
    }

    return (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredDecks.map((deck) => (
                <DeckCard key={deck.id} deck={deck} />
            ))}
        </div>
    );
  }

  return (
    <div className="space-y-6">
        <div className="space-y-4">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Physics Flashcards</h1>
                <p className="text-muted-foreground">
                Select a chapter to begin your study session.
                </p>
            </div>
             <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                    placeholder="Search for a chapter..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                />
            </div>
        </div>
      
      {renderContent()}

      <div className="text-center pt-4">
        <Link href="/flashcards" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to all subjects
        </Link>
      </div>
    </div>
  );
}
