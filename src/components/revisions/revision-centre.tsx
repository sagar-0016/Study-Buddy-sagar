
"use client";

import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Loader2, Lightbulb, Check, X, Wand } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { getRevisionTopics, addRevisionTopic } from '@/lib/revisions';
import type { RevisionTopic } from '@/lib/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';

const RevisionCard = ({ topic }: { topic: RevisionTopic }) => {
  const [showHints, setShowHints] = useState(false);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle>{topic.topicName}</CardTitle>
                <CardDescription>{topic.chapterName}</CardDescription>
            </div>
            <Badge variant="secondary">{topic.subject}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button variant="outline" onClick={() => setShowHints(!showHints)}>
            <Wand className="mr-2 h-4 w-4" />
            {showHints ? 'Hide' : 'Show'} Hints
        </Button>
        {showHints && (
            <div className="p-4 bg-muted/50 rounded-lg border-l-4 border-accent">
                <p className="text-sm text-muted-foreground italic">
                    {topic.hints}
                </p>
            </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
         <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-100 hover:text-red-700">
            <X className="mr-2 h-4 w-4" /> I Forgot
         </Button>
         <Button variant="ghost" size="sm" className="text-green-600 hover:bg-green-100 hover:text-green-700">
            <Check className="mr-2 h-4 w-4" /> I Recalled It!
         </Button>
      </CardFooter>
    </Card>
  )
}


const AddRevisionTopicDialog = ({ onTopicAdded }: { onTopicAdded: () => void }) => {
    const [subject, setSubject] = useState('');
    const [chapterName, setChapterName] = useState('');
    const [topicName, setTopicName] = useState('');
    const [hints, setHints] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const { toast } = useToast();

    const canSubmit = useMemo(() => {
        return subject && chapterName && topicName && hints;
    }, [subject, chapterName, topicName, hints]);

    const handleSubmit = async () => {
        if (!canSubmit) return;

        setIsSaving(true);
        try {
            const newTopic = { subject, chapterName, topicName, hints };
            const newId = await addRevisionTopic(newTopic);
            if(newId) {
                toast({ title: "Success!", description: "New revision topic has been added." });
                onTopicAdded();
                // Reset form
                setSubject('');
                setChapterName('');
                setTopicName('');
                setHints('');
                 // Manually close dialog if needed, though DialogClose should handle it.
            } else {
                 toast({ title: "Error", description: "Failed to add the topic.", variant: "destructive" });
            }
        } catch (error) {
             toast({ title: "Error", description: "An unexpected error occurred.", variant: "destructive" });
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="lg">
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Add Revision Topic
                </Button>
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
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="outline">Cancel</Button>
                    </DialogClose>
                     <Button onClick={handleSubmit} disabled={isSaving || !canSubmit}>
                        {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Topic
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


export default function RevisionCentre() {
  const [topics, setTopics] = useState<RevisionTopic[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTopics = async () => {
    setIsLoading(true);
    const fetchedTopics = await getRevisionTopics();
    setTopics(fetchedTopics);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchTopics();
  }, []);

  return (
    <div className="space-y-6">
       <div className="flex justify-end">
           <AddRevisionTopicDialog onTopicAdded={fetchTopics} />
       </div>

       {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
        </div>
       ) : topics.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg min-h-[200px]">
            <Lightbulb className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold">No Revision Topics Yet</h3>
            <p className="text-muted-foreground">Click "Add Revision Topic" to get started.</p>
        </div>
       ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {topics.map(topic => (
                <RevisionCard key={topic.id} topic={topic} />
            ))}
        </div>
       )}
    </div>
  );
}
