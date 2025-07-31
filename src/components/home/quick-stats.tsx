"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Book, Target } from 'lucide-react';
import { syllabusData } from '@/lib/data';
import { Skeleton } from '@/components/ui/skeleton';

export default function QuickStats() {
    const [progress, setProgress] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let completed = 0;
        let total = 0;

        Object.values(syllabusData).forEach(subject => {
            subject.chapters.forEach(chapter => {
                total += chapter.topics.length;
                chapter.topics.forEach(topic => {
                    const key = `${subject.label}-${chapter.title}-${topic}`;
                    if (localStorage.getItem(key) === 'true') {
                        completed++;
                    }
                });
            });
        });

        const calculatedProgress = total > 0 ? (completed / total) * 100 : 0;
        setProgress(calculatedProgress);
        setIsLoading(false);
    }, []);

    return (
        <Card className="transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-primary/10 text-primary">
                            <Lightbulb className="h-5 w-5" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium">Syllabus Covered</p>
                            {isLoading ? (
                                <Skeleton className="h-7 w-20 mt-1" />
                            ) : (
                                <p className="text-lg font-bold">{Math.round(progress)}%</p>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-accent/10 text-accent">
                            <Book className="h-5 w-5" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium">PYQs Covered</p>
                            <p className="text-lg font-bold">125</p>
                        </div>
                    </div>
                    {/*
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-destructive/10 text-destructive">
                            <Target className="h-5 w-5" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-medium">Average Score</p>
                            <p className="text-lg font-bold">78%</p>
                        </div>
                    </div>
                    */}
                </div>
            </CardContent>
        </Card>
    );
}
