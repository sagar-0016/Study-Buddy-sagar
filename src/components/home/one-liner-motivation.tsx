
"use client";

import { useState, useEffect } from 'react';
import { getRandomOneLiner } from '@/lib/home';
import { Skeleton } from '@/components/ui/skeleton';

export default function OneLinerMotivation() {
    const [liner, setLiner] = useState<string | null>(null);

    useEffect(() => {
        const fetchLiner = async () => {
            const oneLiner = await getRandomOneLiner();
            setLiner(oneLiner);
        }
        fetchLiner();
    }, []);

    if (!liner) {
        return <Skeleton className="h-8 w-full max-w-lg mt-4" />;
    }

    return (
        <p className="text-muted-foreground mt-4 text-lg">
            {liner}
        </p>
    )
}
