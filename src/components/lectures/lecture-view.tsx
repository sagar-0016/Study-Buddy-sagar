

"use client";

import { useState, useEffect, useRef } from 'react';
import type { Lecture, LectureNote } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { addDoubt } from '@/lib/doubts';
import { addLectureFeedback, getLectureNotes, uploadLectureNote } from '@/lib/lectures';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Send, Star, FileText, Upload, Link as LinkIcon, Info, Image as ImageIcon, MessageCircleQuestion, MessageSquarePlus, Download, Notebook, AlertCircle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import CustomVideoPlayer from './custom-video-player';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/auth-context';


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
            await addLectureFeedback(lecture.id, feedbackText, hasRated ? undefined : rating);
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
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { toast } = useToast();
    const { pauseLocking } = useAuth();


    const fetchNotes = async () => {
        setIsLoading(true);
        const fetchedNotes = await getLectureNotes(lecture.id);
        setNotes(fetchedNotes);
        setIsLoading(false);
    }
    
    useEffect(() => {
        fetchNotes();
    }, [lecture.id]);

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
            await uploadLectureNote(
                lecture.id, 
                lecture.title, 
                file,
                setUploadProgress // Pass the progress callback here
            );
            toast({ title: "Success", description: "Your note has been uploaded." });
            await fetchNotes(); // Refresh the notes list
        } catch (error) {
            toast({ title: "Upload Failed", description: "Could not upload your note.", variant: "destructive" });
        } finally {
            setIsUploading(false);
        }
    };
    
    const triggerFileInput = () => {
        pauseLocking(10000); // Pause lock for 10 seconds
        fileInputRef.current?.click();
    }


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
                            <button
                                key={note.id}
                                onClick={() => note.type === 'pdf' ? onSelectPdf(note.url) : window.open(note.url, '_blank')}
                                className="flex w-full items-center gap-3 p-3 rounded-md bg-muted/50 hover:bg-muted transition-colors text-left"
                            >
                                {note.type === 'pdf' ? <FileText className="h-5 w-5 text-primary flex-shrink-0" /> : <LinkIcon className="h-5 w-5 text-primary flex-shrink-0" />}
                                <span className="font-medium text-sm truncate">{note.name}</span>
                            </button>
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
                            <Button variant="outline" className="w-full">
                                <Upload className="mr-2 h-4 w-4" /> Upload PDF
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Heads up!</DialogTitle>
                                <DialogDescription>
                                    For security reasons, after clicking "Proceed to Upload", you'll have 10 seconds to choose your file. The app will lock if it takes longer.
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
                     {isUploading && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Uploading... ({Math.round(uploadProgress)}%)</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}


export default function LectureView({ lecture }: { lecture: Lecture }) {
    const [selectedPdfUrl, setSelectedPdfUrl] = useState<string | null>(null);

    const handleDownloadVideo = () => {
        // This creates a temporary link to trigger the browser's download functionality.
        const link = document.createElement('a');
        link.href = lecture.videoUrl;
        link.setAttribute('download', `${lecture.title}.mp4`); // Suggest a filename
        link.setAttribute('target', '_blank'); // Open in new tab as a fallback
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Main Content: Video and Info */}
            <div className="lg:col-span-2 space-y-6">
                <Card className="overflow-hidden border-0 shadow-none">
                    <CustomVideoPlayer 
                        src={lecture.videoUrl}
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
                        <div className="flex gap-4 mt-4">
                             <Button onClick={handleDownloadVideo}>
                                <Download className="mr-2 h-4 w-4" /> Download Video
                            </Button>
                             <FeedbackDialog lecture={lecture} />
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

            {/* Sidebar: PDF Viewer and Notes List */}
            <div className="lg:col-span-1">
                 <Card className="sticky top-20">
                    <CardContent className="p-4">
                        {selectedPdfUrl ? (
                            <iframe 
                                src={selectedPdfUrl} 
                                className="w-full h-[75vh] rounded-md border"
                                title="PDF Viewer"
                            ></iframe>
                        ) : (
                             <div className="w-full h-[75vh] flex flex-col items-center justify-center text-center p-4 bg-muted/50 rounded-md">
                                <Notebook className="h-16 w-16 text-muted-foreground mb-4"/>
                                <h3 className="text-lg font-semibold">Notes Viewer</h3>
                                <p className="text-sm text-muted-foreground">Select a PDF from the list below to view it here.</p>
                            </div>
                        )}
                         <div className="mt-4">
                           <NotesSection lecture={lecture} onSelectPdf={setSelectedPdfUrl} />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
