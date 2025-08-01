
"use client";

import { useState, useEffect, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlusCircle, Loader2, Lightbulb, Check, X, Wand, RotateCw, Play, Plus, Image as ImageIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { getRevisionTopics, addRevisionTopic, getRecallSessionTopics, updateRecallStats } from '@/lib/revisions';
import type { RevisionTopic } from '@/lib/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Confetti from 'react-confetti';

const AddRevisionTopicDialog = ({ onTopicAdded, children }: { onTopicAdded: () => void, children: React.ReactNode }) => {
    const [subject, setSubject] = useState('');
    const [chapterName, setChapterName] = useState('');
    const [topicName, setTopicName] = useState('');
    const [hints, setHints] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { toast } = useToast();

    const canSubmit = useMemo(() => {
        return subject && chapterName && topicName && hints;
    }, [subject, chapterName, topicName, hints]);

    const resetForm = () => {
        setSubject('');
        setChapterName('');
        setTopicName('');
        setHints('');
        setImageFile(null);
    }

    const handleSubmit = async () => {
        if (!canSubmit) return;

        setIsSaving(true);
        try {
            await addRevisionTopic({
                subject,
                chapterName,
                topicName,
                hints,
                imageFile: imageFile || undefined
            });
            toast({ title: "Success!", description: "New revision topic has been added." });
            onTopicAdded();
            setIsOpen(false);
            resetForm();
        } catch (error) {
             toast({ title: "Error", description: "An unexpected error occurred.", variant: "destructive" });
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) resetForm();
        }}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[480px]">
                <DialogHeader>
                    <DialogTitle>Add New Revision Topic</DialogTitle>
                    <DialogDescription>
                        Add a new topic you want to revise later. Be specific with your hints!
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="subject" className="text-right">Subject</Label>
                        <Select onValueChange={setSubject} value={subject}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Physics">Physics</SelectItem>
                                <SelectItem value="Chemistry">Chemistry</SelectItem>
                                <SelectItem value="Maths">Maths</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="chapter" className="text-right">Chapter</Label>
                        <Input id="chapter" value={chapterName} onChange={(e) => setChapterName(e.target.value)} className="col-span-3" placeholder="e.g., Rotational Motion" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="topic" className="text-right">Topic to Recall</Label>
                        <Input id="topic" value={topicName} onChange={(e) => setTopicName(e.target.value)} className="col-span-3" placeholder="e.g., Moment of Inertia" />
                    </div>
                     <div className="grid grid-cols-4 items-start gap-4">
                        <Label htmlFor="hints" className="text-right pt-2">Hints</Label>
                        <Textarea id="hints" value={hints} onChange={(e) => setHints(e.target.value)} className="col-span-3" placeholder="Add some keywords or formulas to jog your memory." />
                    </div>
                     <div className="grid grid-cols-4 items-start gap-4">
                        <Label htmlFor="image" className="text-right pt-2">Image Hint</Label>
                        <Input id="image" type="file" onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)} className="col-span-3" accept="image/*"/>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                     <Button onClick={handleSubmit} disabled={isSaving || !canSubmit}>
                        {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Topic
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const RevisionSession = ({ topics, onEndSession }: { topics: RevisionTopic[], onEndSession: () => void }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showHints, setShowHints] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const { toast } = useToast();

    const currentTopic = topics[currentIndex];

    const handleNext = async (result: 'success' | 'fail') => {
        setShowHints(false);
        try {
            await updateRecallStats(currentTopic.id, result);
        } catch (error) {
            toast({ title: 'Error', description: 'Could not save your progress.', variant: 'destructive'})
        }

        if (currentIndex < topics.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            // End of session
            setShowConfetti(true);
            setTimeout(() => {
                onEndSession();
            }, 5000)
        }
    }

    if (!currentTopic) {
        return (
             <div className="text-center p-8">
                {showConfetti && <Confetti recycle={false} numberOfPieces={300} />}
                <h2 className="text-2xl font-bold mb-2">🎉 Session Complete!</h2>
                <p className="text-muted-foreground mb-6">Great job on your recall session. Keep up the consistent effort!</p>
                <Button onClick={onEndSession}>
                    <RotateCw className="mr-2 h-4 w-4" /> Start Another Session
                </Button>
            </div>
        )
    }

    return (
        <div className="w-full max-w-2xl mx-auto">
             <div className="mb-4 text-center text-sm font-semibold text-muted-foreground">
                Card {currentIndex + 1} of {topics.length}
            </div>
             <Card className="min-h-[350px] flex flex-col">
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle>{currentTopic.topicName}</CardTitle>
                            <CardDescription>{currentTopic.chapterName}</CardDescription>
                        </div>
                        <Badge variant="secondary">{currentTopic.subject}</Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4 flex-grow">
                    <Button variant="outline" onClick={() => setShowHints(!showHints)}>
                        <Wand className="mr-2 h-4 w-4" />
                        {showHints ? 'Hide' : 'Show'} Hints
                    </Button>
                    <div className={cn("transition-opacity duration-300", showHints ? 'opacity-100' : 'opacity-0')}>
                        {showHints && (
                            <div className="p-4 bg-muted/50 rounded-lg border-l-4 border-accent space-y-4">
                                {currentTopic.hints && (
                                     <p className="text-sm text-muted-foreground italic">
                                        {currentTopic.hints}
                                    </p>
                                )}
                                {currentTopic.hintsImageURL && (
                                     <Dialog>
                                        <DialogTrigger asChild>
                                             <button type="button" className="mt-2 rounded-lg overflow-hidden border w-full md:w-1/2 group relative">
                                                <Image src={currentTopic.hintsImageURL} alt="Hint visual aid" width={300} height={150} className="object-cover w-full" />
                                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <ImageIcon className="h-8 w-8 text-white" />
                                                </div>
                                            </button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-3xl">
                                            <Image src={currentTopic.hintsImageURL} alt="Question visual aid" width={800} height={600} className="rounded-lg object-contain" />
                                        </DialogContent>
                                    </Dialog>
                                )}
                            </div>
                        )}
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button variant="destructive" size="lg" className="w-full sm:w-auto" onClick={() => handleNext('fail')}>
                        <X className="mr-2 h-5 w-5" /> I Forgot
                    </Button>
                    <Button size="lg" className="w-full sm:w-auto bg-green-600 hover:bg-green-700" onClick={() => handleNext('success')}>
                        <Check className="mr-2 h-5 w-5" /> I Recalled It!
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}


export default function RevisionCentre() {
  const [allTopics, setAllTopics] = useState<RevisionTopic[]>([]);
  const [sessionTopics, setSessionTopics] = useState<RevisionTopic[] | null>(null);
  const [sessionSize, setSessionSize] = useState("10");
  const [isLoading, setIsLoading] = useState(true);
  const [isStartingSession, setIsStartingSession] = useState(false);

  const fetchTopics = useCallback(async () => {
    setIsLoading(true);
    const fetchedTopics = await getRevisionTopics();
    setAllTopics(fetchedTopics);
    setIsLoading(false);
  }, [])

  useEffect(() => {
    fetchTopics();
  }, [fetchTopics]);

  const handleStartSession = async () => {
    setIsStartingSession(true);
    const topicsForSession = await getRecallSessionTopics(parseInt(sessionSize, 10));
    setSessionTopics(topicsForSession);
    setIsStartingSession(false);
  }

  const handleEndSession = () => {
    setSessionTopics(null);
    fetchTopics(); // Refetch to get updated stats
  }

  const renderContent = () => {
    if (isLoading) {
      return <Skeleton className="h-64 w-full" />
    }

    if (sessionTopics) {
        return <RevisionSession topics={sessionTopics} onEndSession={handleEndSession}/>
    }
    
    if (allTopics.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg min-h-[300px]">
                <Lightbulb className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold">No Revision Topics Yet</h3>
                <p className="text-muted-foreground mb-6">Click the button in the corner to add your first topic.</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="text-left">
                <h2 className="text-2xl font-bold tracking-tight">Start a Recall Session</h2>
                <p className="text-muted-foreground">Select how many topics you want to revise right now.</p>
            </div>
            <div className="flex flex-col items-start gap-4">
                <Select value={sessionSize} onValueChange={setSessionSize}>
                    <SelectTrigger className="w-full max-w-[240px]">
                        <SelectValue placeholder="Session Size" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="5">5 Cards</SelectItem>
                        <SelectItem value="10">10 Cards</SelectItem>
                        <SelectItem value="20">20 Cards</SelectItem>
                    </SelectContent>
                </Select>
                 <Button size="lg" onClick={handleStartSession} disabled={isStartingSession}>
                    {isStartingSession ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Play className="mr-2 h-5 w-5" />}
                     Start Session
                </Button>
            </div>
        </div>
    )
  }

  return (
    <div className="relative min-h-[calc(100vh-200px)]">
       <div className="text-left">
            {renderContent()}
        </div>

       <div className="fixed bottom-8 right-8 z-50 group">
           <AddRevisionTopicDialog onTopicAdded={fetchTopics}>
                 <Button className="rounded-full h-14 w-auto p-4 shadow-lg flex items-center justify-center">
                    <Plus className="h-6 w-6" />
                    <span className="ml-2 hidden group-hover:block">
                        Add New Topic
                    </span>
                </Button>
           </AddRevisionTopicDialog>
       </div>
    </div>
  );
}
