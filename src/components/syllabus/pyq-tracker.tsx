
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

type ExamType = 'jeeMain' | 'jeeAdvanced';

function SubjectPyqTracker({ subject, examType }: { subject: Subject, examType: ExamType }) {
    const [checkedState, setCheckedState] = useState<Record<string, boolean>>({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProgress = async () => {
            setIsLoading(true);
            const progressData = await getPyqProgress(examType);
            const initialState: Record<string, boolean> = {};
            progressData.forEach(item => {
                initialState[item.id] = item.completed;
            });
            setCheckedState(initialState);
            setIsLoading(false);
        };
        fetchProgress();
    }, [subject, examType]);
    
    const handleCheckboxChange = async (pyqKey: string, checked: boolean) => {
        setCheckedState(prevState => ({ ...prevState, [pyqKey]: checked }));
        await updatePyqStatus(pyqKey, checked, examType);
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
                                                id={`${pyqKey}-${examType}`}
                                                checked={checkedState[pyqKey] || false}
                                                onCheckedChange={(checked) => handleCheckboxChange(pyqKey, !!checked)}
                                            />
                                            <Label htmlFor={`${pyqKey}-${examType}`} className="w-full font-normal cursor-pointer">
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
    const [examType, setExamType] = useState<ExamType>('jeeMain');

    return (
        <Card>
            <CardContent className="p-0 sm:p-4">
                <Tabs defaultValue={examType} onValueChange={(value) => setExamType(value as ExamType)}>
                     <TabsList className="grid w-full grid-cols-2 mb-4">
                        <TabsTrigger value="jeeMain">JEE Main</TabsTrigger>
                        <TabsTrigger value="jeeAdvanced">JEE Advanced</TabsTrigger>
                    </TabsList>
                    <Tabs defaultValue="physics" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="physics">Physics</TabsTrigger>
                            <TabsTrigger value="chemistry">Chemistry</TabsTrigger>
                            <TabsTrigger value="maths">Maths</TabsTrigger>
                        </TabsList>
                        <TabsContent value="physics" className="p-4">
                            <SubjectPyqTracker subject={syllabusData.physics} examType={examType} />
                        </TabsContent>
                        <TabsContent value="chemistry" className="p-4">
                            <SubjectPyqTracker subject={syllabusData.chemistry} examType={examType} />
                        </TabsContent>
                        <TabsContent value="maths" className="p-4">
                            <SubjectPyqTracker subject={syllabusData.maths} examType={examType} />
                        </TabsContent>
                    </Tabs>
                </Tabs>
            </CardContent>
        </Card>
    )
}
