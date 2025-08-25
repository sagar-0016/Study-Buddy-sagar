
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gift } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { getRandomFeatureTip } from '@/lib/home';
import type { AccessLevel } from '@/context/auth-context';

export default function AppFeatures() {
    const [featureTip, setFeatureTip] = useState<string | null>(null);
    const [accessLevel, setAccessLevel] = useState<AccessLevel | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const level = localStorage.getItem('study-buddy-access-level') as AccessLevel | null;
        setAccessLevel(level);

        const fetchFeatureTip = async () => {
            if (level === 'full') {
                const randomTip = await getRandomFeatureTip();
                setFeatureTip(randomTip);
            }
            setIsLoading(false);
        }
        fetchFeatureTip();
    }, []);

    if (isLoading) {
        return (
            <Card className="border-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">App Feature</CardTitle>
                    <Gift className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                    </div>
                </CardContent>
            </Card>
        )
    }

    if (accessLevel !== 'full') {
        return null; // Don't render the component for non-full access users
    }

    return (
        <Card className="border-0 transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">App Feature</CardTitle>
                <Gift className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                {featureTip ? (
                    <p className="text-sm text-muted-foreground">"{featureTip}"</p>
                ) : (
                    <p className="text-sm text-muted-foreground">"Explore the app to find more hidden gems!"</p>
                )}
            </CardContent>
        </Card>
    )
}
