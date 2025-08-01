
"use client";

import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { syllabusData } from '@/lib/data';
import type { Subject, Chapter, SyllabusChapter } from '@/lib/types';
import { getSyllabusProgress, updateSyllabusTopicStatus } from '@/lib/syllabus';
import { getPyqProgress, updatePyqStatus } from '@/lib/pyq';
import { Skeleton } from '@/components/ui/skeleton';
import { ClipboardCheck, Info } from 'lucide-react';

function SubjectSyllabus({ subject }: { subject: Subject }) {
  const [checkedState, setCheckedState] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProgress = async () => {
        setIsLoading(true);
        const progressData = await getSyllabusProgress();
        const initialState: Record<string, boolean> = {};
        progressData.forEach(item => {
            initialState[item.id] = item.completed;
        });
        setCheckedState(initialState);
        setIsLoading(false);
    };
    fetchProgress();
  }, [subject]);

  const handleCheckboxChange = async (topicKey: string, checked: boolean) => {
    // Optimistically update UI
    setCheckedState(prevState => ({ ...prevState, [topicKey]: checked }));
    // Update Firestore
    await updateSyllabusTopicStatus(topicKey, checked);
  };

  const { completedTopics, totalTopics, progress } = useMemo(() => {
    let completed = 0;
    let total = 0;
    subject.chapters.forEach(chapter => {
      chapter.topics.forEach(topic => {
        total++;
        const key = `${subject.label}-${chapter.title}-${topic.name}`;
        if (checkedState[key]) {
          completed++;
        }
      });
    });
    return {
      completedTopics: completed,
      totalTopics: total,
      progress: total > 0 ? (completed / total) * 100 : 0,
    };
  }, [checkedState, subject]);

  if (isLoading) {
    return (
      <div className="space-y-4 p-4">
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-12 w-full mt-4" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
       <div className="space-y-2">
        <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-muted-foreground">Overall Progress</span>
            <span className="text-sm font-semibold text-primary">{completedTopics} / {totalTopics} topics</span>
        </div>
        <Progress value={progress} />
      </div>

      <Accordion type="multiple" className="w-full">
        {subject.chapters.map((chapter: Chapter) => (
          <AccordionItem key={chapter.title} value={chapter.title}>
            <AccordionTrigger>{chapter.title}</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3">
                {chapter.topics.map(topic => {
                  const topicKey = `${subject.label}-${chapter.title}-${topic.name}`;
                  return (
                    <div key={topic.name} className="flex items-center space-x-3 rounded-md p-2 hover:bg-muted/50 transition-colors">
                      <Checkbox
                        id={topicKey}
                        checked={checkedState[topicKey] || false}
                        onCheckedChange={(checked) => handleCheckboxChange(topicKey, !!checked)}
                      />
                      <Label htmlFor={topicKey} className="w-full font-normal cursor-pointer">
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
  );
}

function PyqTracker({ subject }: { subject: Subject }) {
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

function PyqSection() {
    return (
        <Tabs defaultValue="physics" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="physics">Physics</TabsTrigger>
                <TabsTrigger value="chemistry">Chemistry</TabsTrigger>
                <TabsTrigger value="maths">Maths</TabsTrigger>
            </TabsList>
            <TabsContent value="physics" className="p-4">
                <PyqTracker subject={syllabusData.physics} />
            </TabsContent>
            <TabsContent value="chemistry" className="p-4">
                <PyqTracker subject={syllabusData.chemistry} />
            </TabsContent>
            <TabsContent value="maths" className="p-4">
                <PyqTracker subject={syllabusData.maths} />
            </TabsContent>
        </Tabs>
    )
}

const weightageLevels: Record<number, { label: string; description: string; color: string }> = {
    5: { label: 'Level 5', description: '>2 questions on average', color: 'bg-red-500' },
    4: { label: 'Level 4', description: '>1 question for sure', color: 'bg-orange-500' },
    3: { label: 'Level 3', description: 'One question almost all the time', color: 'bg-yellow-500' },
    2: { label: 'Level 2', description: 'Rarely comes, but sometimes >1 question', color: 'bg-green-500' },
    1: { label: 'Level 1', description: 'Quite rare to have a question', color: 'bg-blue-500' },
};

function SyllabusWeightage({ subject }: { subject: Subject }) {
    
  const getWeightageColor = (level: number) => {
    return weightageLevels[level]?.color ?? 'bg-muted';
  };

  return (
    <div className="space-y-4">
      <Accordion type="multiple" className="w-full">
        {subject.chapters.map((chapter: Chapter) => (
          <AccordionItem key={chapter.title} value={chapter.title}>
            <AccordionTrigger>{chapter.title}</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {chapter.topics.map(topic => (
                  <div key={topic.name} className="flex items-center gap-3 rounded-md p-2">
                    <div className={`w-3 h-3 rounded-full ${getWeightageColor(topic.weightage)}`}></div>
                    <Label htmlFor={topic.name} className="w-full font-normal">
                      {topic.name}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

function DescriptionSection() {
    return (
        <Tabs defaultValue="physics" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="physics">Physics</TabsTrigger>
                <TabsTrigger value="chemistry">Chemistry</TabsTrigger>
                <TabsTrigger value="maths">Maths</TabsTrigger>
            </TabsList>
            <TabsContent value="physics" className="p-4">
                <SyllabusWeightage subject={syllabusData.physics} />
            </TabsContent>
            <TabsContent value="chemistry" className="p-4">
                <SyllabusWeightage subject={syllabusData.chemistry} />
            </TabsContent>
            <TabsContent value="maths" className="p-4">
                <SyllabusWeightage subject={syllabusData.maths} />
            </TabsContent>
            <CardFooter className="mt-6">
                <div className="w-full space-y-3">
                    <h4 className="font-semibold text-center">Weightage Legend</h4>
                     <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
                        {Object.entries(weightageLevels).sort((a,b) => parseInt(b[0]) - parseInt(a[0])).map(([level, { label, description, color }]) => (
                            <div key={level} className="flex items-center gap-2 text-xs">
                                <div className={`w-3 h-3 rounded-full ${color}`}></div>
                                <span><span className="font-bold">{label}:</span> {description}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </CardFooter>
        </Tabs>
    )
}


export default function SyllabusTracker() {
  return (
    <Card>
      <CardContent className="p-0 sm:p-4">
        <Tabs defaultValue="physics" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="physics">Physics</TabsTrigger>
            <TabsTrigger value="chemistry">Chemistry</TabsTrigger>
            <TabsTrigger value="maths">Maths</TabsTrigger>
            <TabsTrigger value="pyq" className="flex items-center gap-2">
                <ClipboardCheck className="h-4 w-4" /> PYQs
            </TabsTrigger>
            <TabsTrigger value="description" className="flex items-center gap-2">
                <Info className="h-4 w-4" /> Description
            </TabsTrigger>
          </TabsList>
          <TabsContent value="physics" className="p-4">
            <SubjectSyllabus subject={syllabusData.physics} />
          </TabsContent>
          <TabsContent value="chemistry" className="p-4">
            <SubjectSyllabus subject={syllabusData.chemistry} />
          </TabsContent>
          <TabsContent value="maths" className="p-4">
            <SubjectSyllabus subject={syllabusData.maths} />
          </TabsContent>
          <TabsContent value="pyq" className="p-4">
            <PyqSection />
          </TabsContent>
          <TabsContent value="description" className="p-0 sm:p-4">
            <DescriptionSection />
          </TabsContent>
        </Tabs>
      </CardContent>
       <CardFooter className="p-4 bg-accent/20 border-t text-accent-foreground rounded-b-lg">
          <p className="text-sm">
            <span className="font-semibold">Note:</span> For the chapters which you have marked as completed in the syllabus, do move forward with their PYQs.
          </p>
      </CardFooter>
    </Card>
  );
}
