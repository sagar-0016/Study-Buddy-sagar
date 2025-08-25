
"use client";

import { useState } from 'react';
import type { Lecture, LectureNote } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { addDoubt } from '@/lib/doubts';
import { addLectureFeedback, getLectureNotes } from '@/lib/lectures';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Send, Star, FileText, Upload, Link as LinkIcon, Info } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const DoubtSection = ({ lecture }: { lecture: Lecture }) => {
    const [doubtText, setDoubtText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const handleSubmitDoubt = async () => {
        if (!doubtText) return;
        setIsSubmitting(true);
        try {
            const fullText = `Regarding the lecture "${lecture.title}":\n\n${doubtText}`;
            await addDoubt({ text: fullText, subject: lecture.subject });
            toast({ title: "Success", description: "Your doubt has been submitted." });
            setDoubtText('');
        } catch (error) {
            toast({ title: "Error", description: "Could not submit your doubt.", variant: "destructive" });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Have a Doubt?</h3>
            <p className="text-sm text-muted-foreground">
                Confused about a concept in this lecture? Ask your question here, and it will appear in the Doubt Centre.
            </p>
            <div className="space-y-2">
                <Label htmlFor="doubt-textarea">Your Question</Label>
                <Textarea 
                    id="doubt-textarea"
                    value={doubtText}
                    onChange={(e) => setDoubtText(e.target.value)}
                    placeholder={`e.g., At 5:32, why is the force of friction acting upwards?`}
                    rows={4}
                />
            </div>
            <Button onClick={handleSubmitDoubt} disabled={isSubmitting || !doubtText}>
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                Submit Doubt
            </Button>
        </div>
    )
}

const FeedbackSection = ({ lecture }: { lecture: Lecture }) => {
    const [feedbackText, setFeedbackText] = useState('');
    const [rating, setRating] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const handleSubmitFeedback = async () => {
        if (!feedbackText || rating === 0) {
            toast({ title: "Incomplete", description: "Please provide a rating and some feedback text.", variant: "destructive" });
            return;
        }
        setIsSubmitting(true);
        try {
            await addLectureFeedback(lecture.id, feedbackText, rating);
            toast({ title: "Thank you!", description: "Your feedback has been submitted." });
            setFeedbackText('');
            setRating(0);
        } catch (error) {
            toast({ title: "Error", description: "Could not submit your feedback.", variant: "destructive" });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Lecture Feedback</h3>
            <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} onClick={() => setRating(star)}>
                        <Star className={`h-6 w-6 transition-colors ${rating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
                    </button>
                ))}
            </div>
            <div className="space-y-2">
                <Label htmlFor="feedback-textarea">Your Feedback</Label>
                <Textarea 
                    id="feedback-textarea"
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="What did you like or dislike about this lecture?"
                    rows={4}
                />
            </div>
            <Button onClick={handleSubmitFeedback} disabled={isSubmitting || !feedbackText || rating === 0}>
                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                Submit Feedback
            </Button>
        </div>
    )
}

const NotesSection = ({ lecture }: { lecture: Lecture }) => {
    const [notes, setNotes] = useState<LectureNote[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useState(() => {
        const fetchNotes = async () => {
            setIsLoading(true);
            const fetchedNotes = await getLectureNotes(lecture.id);
            setNotes(fetchedNotes);
            setIsLoading(false);
        }
        fetchNotes();
    })

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-semibold">Lecture Notes</h3>
                <p className="text-sm text-muted-foreground">Official notes and resources for this lecture.</p>
                {isLoading ? (
                    <div className="mt-4 space-y-2">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                ) : notes.length > 0 ? (
                     <div className="mt-4 space-y-2">
                        {notes.map(note => (
                            <a key={note.id} href={note.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-md bg-muted/50 hover:bg-muted transition-colors">
                                {note.type === 'pdf' ? <FileText className="h-5 w-5 text-primary" /> : <LinkIcon className="h-5 w-5 text-primary" />}
                                <span className="font-medium">{note.name}</span>
                            </a>
                        ))}
                    </div>
                ) : (
                    <p className="mt-4 text-sm text-muted-foreground italic">No official notes available for this lecture.</p>
                )}
            </div>

            <div className="pt-6 border-t">
                <h3 className="text-lg font-semibold">Your Notes</h3>
                <p className="text-sm text-muted-foreground">Upload your own PDF notes for this lecture.</p>
                <div className="mt-4 p-4 border-2 border-dashed rounded-lg flex flex-col items-center text-center">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="font-semibold mb-1">Upload PDF</p>
                    <p className="text-xs text-muted-foreground mb-3">Feature coming soon</p>
                    <Button disabled size="sm">
                        Choose File
                    </Button>
                </div>
            </div>
        </div>
    )
}


export default function LectureView({ lecture }: { lecture: Lecture }) {

    return (
        <div className="space-y-6">
            <Card className="overflow-hidden">
                <div className="aspect-video bg-black">
                     <video
                        controls
                        src={lecture.videoUrl}
                        className="w-full h-full"
                        poster={lecture.thumbnailUrl}
                    >
                        Your browser does not support the video tag.
                    </video>
                </div>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>{lecture.title}</CardTitle>
                            <CardDescription>{lecture.channel} • {lecture.subject}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="description">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="description">Description & Doubts</TabsTrigger>
                                    <TabsTrigger value="feedback">Feedback</TabsTrigger>
                                </TabsList>
                                <TabsContent value="description" className="pt-6">
                                     <div className="prose prose-sm dark:prose-invert max-w-none">
                                        <p>{lecture.description}</p>
                                    </div>
                                    <div className="mt-6 pt-6 border-t">
                                        <DoubtSection lecture={lecture} />
                                    </div>
                                </TabsContent>
                                <TabsContent value="feedback" className="pt-6">
                                    <FeedbackSection lecture={lecture} />
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-1">
                     <Card>
                        <CardHeader>
                            <CardTitle>Resources</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <NotesSection lecture={lecture} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
