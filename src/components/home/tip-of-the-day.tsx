
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { getRandomTip } from '@/lib/home';

export default function TipOfTheDay() {
    const [tip, setTip] = useState<string | null>(null);

    useEffect(() => {
        const fetchTip = async () => {
            const randomTip = await getRandomTip();
            setTip(randomTip);
        }
        fetchTip();
    }, []);

    return (
        <Card className="border-0 transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-end space-y-0 pb-2">
                <Lightbulb className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                {tip ? (
                    <p className="text-sm text-muted-foreground italic">"{tip}"</p>
                ) : (
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
