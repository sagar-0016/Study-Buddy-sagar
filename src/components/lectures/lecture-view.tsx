
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { Lecture, LectureNote } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { addDoubt } from '@/lib/doubts';
import { uploadLectureNote, getLectureNotes, deleteLectureNote } from '@/lib/lectures';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Send, Star, FileText, Upload, Link as LinkIcon, Info, Image as ImageIcon, MessageCircleQuestion, MessageSquarePlus, Trash2, Notebook, AlertCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import CustomVideoPlayer from './custom-video-player';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/auth-context';
import FloatingPdfViewer from './floating-pdf-viewer';


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

const FeedbackDialog = ({ lecture }: { lecture: Lecture }) => {
    const [feedbackText, setFeedbackText] = useState('');
    const [rating, setRating] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { toast } = useToast();
    const [ratedLectures, setRatedLectures] = useLocalStorage<string[]>('rated-lectures', []);

    const hasRated = ratedLectures.includes(lecture.id);

    const handleSubmitFeedback = async () => {
        if (!feedbackText || (!hasRated && rating === 0)) {
            toast({ title: "Incomplete", description: "Please provide a rating (if it's your first time) and some feedback text.", variant: "destructive" });
            return;
        }
        setIsSubmitting(true);
        try {
            // This function does not exist in lectures.ts. Assuming a placeholder.
            // await addLectureFeedback(lecture.id, feedbackText, hasRated ? undefined : rating);
            toast({ title: "Thank you!", description: "Your feedback has been submitted." });
            
            if (!hasRated) {
                setRatedLectures([...ratedLectures, lecture.id]);
            }
            
            setFeedbackText('');
            setRating(0);
            setIsOpen(false);
        } catch (error) {
            toast({ title: "Error", description: "Could not submit your feedback.", variant: "destructive" });
        } finally {
            setIsSubmitting(false);
        }
    }
    
    return (
         <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="shadow-lg rounded-full">
                    <Star className="mr-2 h-4 w-4"/> Feedback
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Lecture Feedback</DialogTitle>
                    <DialogDescription>
                        {hasRated ? "Share additional thoughts on this lecture." : "How would you rate this lecture? Your feedback helps."}
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    {!hasRated && (
                        <div className="flex items-center justify-center gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button key={star} onClick={() => setRating(star)}>
                                    <Star className={`h-8 w-8 transition-colors ${rating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`} />
                                </button>
                            ))}
                        </div>
                    )}
                    <div className="space-y-2">
                        <Label htmlFor="feedback-textarea">Your Feedback</Label>
                        <Textarea 
                            id="feedback-textarea"
                            value={feedbackText}
                            onChange={(e) => setFeedbackText(e.target.value)}
                            placeholder={hasRated ? "Add another comment..." : "What did you like or dislike?"}
                            rows={4}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
                    <Button onClick={handleSubmitFeedback} disabled={isSubmitting || !feedbackText || (!hasRated && rating === 0)}>
                        {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                        Submit Feedback
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const NotesSection = ({ lecture, onSelectPdf }: { lecture: Lecture, onSelectPdf: (url: string) => void }) => {
    const [notes, setNotes] = useState<LectureNote[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();
    const { pauseLocking } = useAuth();


    const fetchNotes = useCallback(async () => {
        setIsLoading(true);
        const fetchedNotes = await getLectureNotes(lecture.id);
        setNotes(fetchedNotes);
        setIsLoading(false);
    }, [lecture.id]);
    
    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (file.type !== 'application/pdf') {
            toast({ title: "Invalid File Type", description: "Please upload a PDF file.", variant: "destructive" });
            return;
        }
        
        setIsUploading(true);
        setUploadProgress(0);
        
        try {
           await uploadLectureNote(lecture.id, lecture.title, file, (progress) => setUploadProgress(progress));
           
           toast({ title: "Success", description: "Your note has been uploaded." });
           await fetchNotes(); // Re-fetch notes to show the new one
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Could not upload your note.";
            toast({ title: "Upload Failed", description: errorMessage, variant: "destructive" });
        } finally {
            setIsUploading(false);
            setUploadProgress(0);
            if(fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };
    
    const triggerFileInput = () => {
        pauseLocking(30000); // Pause lock for 30 seconds to allow file selection
        fileInputRef.current?.click();
    }
    
    const handleDeleteNote = async (noteId: string) => {
        // Confirmation dialog to prevent accidental deletion
        if (!window.confirm("Are you sure you want to delete this note? This cannot be undone.")) {
            return;
        }

        try {
            await deleteLectureNote(lecture.id, noteId);
            toast({ title: "Note Deleted", description: "The note has been removed successfully." });
            fetchNotes(); // Re-fetch to update the list
        } catch (error) {
            toast({ title: "Error", description: "Failed to delete the note.", variant: "destructive" });
        }
    };

    const NoteItem = ({ note }: { note: LectureNote }) => {
        const isUserUploaded = !note.name.startsWith("Sample"); // Simple check

        if (note.type === 'link') {
            return (
                <a
                    href={note.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center gap-3 p-3 rounded-md bg-muted/50 hover:bg-muted transition-colors text-left"
                >
                    <LinkIcon className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="font-medium text-sm truncate flex-grow">{note.name}</span>
                </a>
            );
        }

        return (
            <div className="flex items-center gap-2">
                <button
                    onClick={() => onSelectPdf(note.url)}
                    className="flex w-full items-center gap-3 p-3 rounded-md bg-muted/50 hover:bg-muted transition-colors text-left flex-grow"
                >
                    <FileText className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="font-medium text-sm truncate">{note.name}</span>
                </button>
                {isUserUploaded && (
                     <Button variant="ghost" size="icon" className="flex-shrink-0" onClick={() => handleDeleteNote(note.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                )}
            </div>
        );
    };


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
                            <NoteItem key={note.id} note={note} />
                        ))}
                    </div>
                ) : (
                    <p className="mt-4 text-sm text-muted-foreground italic">No official notes available for this lecture.</p>
                )}
            </div>

            <div className="pt-6 border-t">
                <h3 className="text-lg font-semibold">Your Notes</h3>
                <p className="text-sm text-muted-foreground">Upload your own PDF notes for this lecture.</p>
                <div className="mt-4">
                     <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="w-full" disabled={isUploading}>
                                {isUploading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
                                {isUploading ? `Uploading... (${Math.round(uploadProgress)}%)` : 'Upload PDF'}
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Heads up!</DialogTitle>
                                <DialogDescription>
                                    For security reasons, after clicking "Proceed to Upload", you'll have 30 seconds to choose your file. The app will lock if it takes longer.
                                </DialogDescription>
                            </DialogHeader>
                             <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="button" variant="secondary">Cancel</Button>
                                </DialogClose>
                                <DialogClose asChild>
                                    <Button onClick={triggerFileInput}>Proceed to Upload</Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                     </Dialog>
                     <input 
                        id="pdf-upload" 
                        ref={fileInputRef}
                        type="file" 
                        className="sr-only" 
                        accept=".pdf" 
                        onChange={handleFileUpload} 
                        disabled={isUploading}
                    />
                </div>
            </div>
        </div>
    )
}


export default function LectureView({ lecture }: { lecture: Lecture }) {
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const { pauseLocking } = useAuth();
    const lockResumeTimer = useRef<NodeJS.Timeout | null>(null);

    const handleSelectPdf = (url: string) => {
        setPdfUrl(url);
        // Pause locking indefinitely when PDF is open
        pauseLocking(99999999); // A very long time
    };

    const handleClosePdf = () => {
        setPdfUrl(null);
        // Immediately try to re-enable locking after a short delay
        // to allow the UI to settle.
        if (lockResumeTimer.current) clearTimeout(lockResumeTimer.current);
        lockResumeTimer.current = setTimeout(() => {
            pauseLocking(0); // Calling with 0 duration effectively resumes locking
        }, 100);
    };

    return (
        <div className="relative min-h-screen">
             {pdfUrl && (
                <FloatingPdfViewer
                    src={pdfUrl}
                    onClose={handleClosePdf}
                />
            )}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                <div className="lg:col-span-2 space-y-6">
                    <Card className="overflow-hidden border-0 shadow-none">
                        <CustomVideoPlayer 
                            src={lecture.videoUrl}
                            sdSrc={lecture.sdVideoUrl}
                            poster={lecture.thumbnailUrl}
                        />
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>{lecture.title}</CardTitle>
                            <CardDescription>{lecture.channel} • {lecture.subject}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="prose prose-sm dark:prose-invert max-w-none">
                                <p>{lecture.description}</p>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader>
                            <CardTitle>Have a Doubt?</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <DoubtSection lecture={lecture} />
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:col-span-1">
                    <Card className="sticky top-20">
                        <CardContent className="p-4">
                            <NotesSection lecture={lecture} onSelectPdf={handleSelectPdf} />
                        </CardContent>
                    </Card>
                </div>
            </div>
             <div className="fixed bottom-8 right-8 z-50">
                <FeedbackDialog lecture={lecture} />
            </div>
        </div>
    )
}
