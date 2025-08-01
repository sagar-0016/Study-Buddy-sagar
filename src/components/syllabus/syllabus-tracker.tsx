
"use client";

import { useState, useMemo, useEffect } from 'react';
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
import { Progress } from '@/components/ui/progress';
import { syllabusData } from '@/lib/data';
import type { Subject, Chapter } from '@/lib/types';
import { getSyllabusProgress, updateSyllabusTopicStatus } from '@/lib/syllabus';
import { Skeleton } from '@/components/ui/skeleton';

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
      total += chapter.topics.length;
      chapter.topics.forEach(topic => {
        const key = `${subject.label}-${chapter.title}-${topic}`;
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
                  const topicKey = `${subject.label}-${chapter.title}-${topic}`;
                  return (
                    <div key={topic} className="flex items-center space-x-3 rounded-md p-2 hover:bg-muted/50 transition-colors">
                      <Checkbox
                        id={topicKey}
                        checked={checkedState[topicKey] || false}
                        onCheckedChange={(checked) => handleCheckboxChange(topicKey, !!checked)}
                      />
                      <Label htmlFor={topicKey} className="w-full font-normal cursor-pointer">
                        {topic}
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


export default function SyllabusTracker() {
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
            <SubjectSyllabus subject={syllabusData.physics} />
          </TabsContent>
          <TabsContent value="chemistry" className="p-4">
            <SubjectSyllabus subject={syllabusData.chemistry} />
          </TabsContent>
          <TabsContent value="maths" className="p-4">
            <SubjectSyllabus subject={syllabusData.maths} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
