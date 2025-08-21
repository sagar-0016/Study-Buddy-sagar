
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BrainstormingTool from '@/components/tricky-topics/brainstorming-tool';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useState, useMemo } from 'react';
import { addBrainstormingTopic } from '@/lib/brainstorming';
import { useToast } from '@/hooks/use-toast';
import { Loader2, PlusCircle, Send } from 'lucide-react';
import { BrainCircuit } from 'lucide-react';

const AddBrainstormingTopic = ({ onTopicAdded }: { onTopicAdded: () => void }) => {
    const [question, setQuestion] = useState('');
    const [subject, setSubject] = useState('');
    const [guideline, setGuideline] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const { toast } = useToast();

    const canSubmit = useMemo(() => question && subject && guideline, [question, subject, guideline]);

    const handleSubmit = async () => {
        if (!canSubmit) return;
        setIsSaving(true);
        try {
            await addBrainstormingTopic({ question, subject, guideline });
            toast({ title: "Success!", description: "Your brainstorming topic has been added." });
            setQuestion('');
            setSubject('');
            setGuideline('');
            onTopicAdded(); // This will trigger a re-fetch in the parent
        } catch (error) {
            toast({ title: "Error", description: "Could not add your topic.", variant: "destructive" });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Add Your Own Topic</CardTitle>
                <CardDescription>
                    Encountered a tricky question? Add it here to think over later. Provide a question and a brief guideline or hint for yourself.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid gap-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select onValueChange={setSubject} value={subject}>
                        <SelectTrigger id="subject">
                            <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Physics">Physics</SelectItem>
                            <SelectItem value="Chemistry">Chemistry</SelectItem>
                            <SelectItem value="Maths">Maths</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="question">Question</Label>
                    <Textarea id="question" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="What's the question you want to brainstorm?" />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="guideline">Guideline / Hint</Label>
                    <Textarea id="guideline" value={guideline} onChange={(e) => setGuideline(e.target.value)} placeholder="Add a hint or the key concept involved to guide your future self." />
                </div>
                <Button onClick={handleSubmit} disabled={isSaving || !canSubmit}>
                    {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <PlusCircle className="mr-2 h-4 w-4" />}
                    Add Topic
                </Button>
            </CardContent>
        </Card>
    )
};

export default function BrainstormingPage() {
    // This state and function are used to trigger a re-render of BrainstormingTool
    const [refreshKey, setRefreshKey] = useState(0); 
    const handleTopicAdded = () => setRefreshKey(prev => prev + 1);

    return (
        <Tabs defaultValue="topics" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="topics">Brainstorming Topics</TabsTrigger>
                <TabsTrigger value="add-new">Add Your Own</TabsTrigger>
            </TabsList>
            <TabsContent value="topics" className="mt-4">
                <Card>
                    <CardHeader>
                         <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/10 rounded-full">
                                <BrainCircuit className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <CardTitle>Guided Brainstorming</CardTitle>
                                <CardDescription>
                                    Think through these curated complex problems. Click on one to record and submit your thought process.
                                </CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <BrainstormingTool key={refreshKey} />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="add-new" className="mt-4">
                <AddBrainstormingTopic onTopicAdded={handleTopicAdded} />
            </TabsContent>
        </Tabs>
    );
}
