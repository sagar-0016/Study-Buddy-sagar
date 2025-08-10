
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { syllabusData } from '@/lib/data';
import type { Subject, Chapter } from '@/lib/types';
import { getPyqProgress, updatePyqStatus } from '@/lib/pyq';
import { Skeleton } from '@/components/ui/skeleton';

function SubjectPyqTracker({ subject }: { subject: Subject }) {
    const [checkedState, setCheckedState] = useState<Record<string, boolean>>({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProgress = async () => {
            setIsLoading(true);
            const progressData = await getPyqProgress();
            const initialState: Record<string, boolean> = {};
            progressData.forEach(item => {
                initialState[item.id] = item.completed;
            });
            setCheckedState(initialState);
            setIsLoading(false);
        };
        fetchProgress();
    }, [subject]);
    
    const handleCheckboxChange = async (pyqKey: string, checked: boolean) => {
        setCheckedState(prevState => ({ ...prevState, [pyqKey]: checked }));
        await updatePyqStatus(pyqKey, checked);
    };

     if (isLoading) {
        return (
            <div className="space-y-4 p-4">
                {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
            </div>
        );
    }

    return (
         <div className="space-y-4">
            <Accordion type="multiple" className="w-full">
                {subject.chapters.map((chapter: Chapter) => (
                    <AccordionItem key={chapter.title} value={chapter.title}>
                        <AccordionTrigger>{chapter.title}</AccordionTrigger>
                        <AccordionContent>
                           <div className="space-y-3">
                                {chapter.topics.map(topic => { 
                                    const pyqKey = `${subject.label}-${chapter.title}-${topic.name}`;
                                    return (
                                        <div key={pyqKey} className="flex items-center space-x-3 rounded-md p-2 hover:bg-muted/50 transition-colors">
                                            <Checkbox
                                                id={pyqKey}
                                                checked={checkedState[pyqKey] || false}
                                                onCheckedChange={(checked) => handleCheckboxChange(pyqKey, !!checked)}
                                            />
                                            <Label htmlFor={pyqKey} className="w-full font-normal cursor-pointer">
                                                {topic.name}
                                            </Label>
                                        </div>
                                    );
                                })}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}

export default function PyqTracker() {
    return (
        <Card>
            <CardContent className="p-0 sm:p-4">
                <Tabs defaultValue="physics" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="physics">Physics</TabsTrigger>
                        <TabsTrigger value="chemistry">Chemistry</TabsTrigger>
                        <TabsTrigger value="maths">Maths</TabsTrigger>
                    </TabsList>
                    <TabsContent value="physics" className="p-4">
                        <SubjectPyqTracker subject={syllabusData.physics} />
                    </TabsContent>
                    <TabsContent value="chemistry" className="p-4">
                        <SubjectPyqTracker subject={syllabusData.chemistry} />
                    </TabsContent>
                    <TabsContent value="maths" className="p-4">
                        <SubjectPyqTracker subject={syllabusData.maths} />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    )
}
