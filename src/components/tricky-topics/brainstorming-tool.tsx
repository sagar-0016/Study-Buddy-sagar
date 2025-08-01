
"use client";

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { getBrainstormingTopics } from '@/lib/brainstorming';
import type { BrainstormingTopic } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, ArrowRight, Lightbulb, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function BrainstormingTool() {
    const [topics, setTopics] = useState<BrainstormingTopic[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userThoughts, setUserThoughts] = useState('');
    const [showGuideline, setShowGuideline] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTopics = async () => {
            setIsLoading(true);
            const fetchedTopics = await getBrainstormingTopics();
            setTopics(fetchedTopics);
            setIsLoading(false);
        };
        fetchTopics();
    }, []);

    const currentTopic = useMemo(() => topics[currentIndex], [topics, currentIndex]);

    const handleNext = () => {
        if (currentIndex < topics.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setUserThoughts('');
            setShowGuideline(false);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
            setUserThoughts('');
            setShowGuideline(false);
        }
    };

    if (isLoading) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-10 w-1/3" />
            </div>
        );
    }
    
    if (!currentTopic) {
        return (
             <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg min-h-[40vh]">
                <Lightbulb className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold">No Brainstorming Topics Found</h3>
                <p className="text-muted-foreground">Come back later for more thought-provoking questions.</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle>Brainstorming Session</CardTitle>
                            <CardDescription>Think through the problem before revealing the guideline.</CardDescription>
                        </div>
                        <Badge variant="secondary">{currentTopic.subject}</Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-base font-semibold leading-relaxed">{currentTopic.question}</p>
                    <Textarea 
                        placeholder="Jot down your initial thoughts, key concepts, formulas, and approach here..."
                        rows={8}
                        value={userThoughts}
                        onChange={(e) => setUserThoughts(e.target.value)}
                    />
                </CardContent>
                <CardFooter>
                    <Button onClick={() => setShowGuideline(true)} disabled={showGuideline}>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Reveal Guideline
                    </Button>
                </CardFooter>
            </Card>

            {showGuideline && (
                <Card className="bg-muted/30 animate-in fade-in-50">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Lightbulb className="text-accent" />
                            Suggested Approach
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="whitespace-pre-wrap text-muted-foreground">{currentTopic.guideline}</p>
                    </CardContent>
                </Card>
            )}

            <Separator />
            
            <div className="flex justify-between items-center">
                <Button variant="outline" onClick={handlePrev} disabled={currentIndex === 0}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                </Button>
                 <span className="text-sm font-medium text-muted-foreground">
                    Question {currentIndex + 1} of {topics.length}
                </span>
                <Button variant="outline" onClick={handleNext} disabled={currentIndex === topics.length - 1}>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
