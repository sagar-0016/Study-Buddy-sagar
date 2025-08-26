
"use client";

import { useState, useRef, useEffect, useCallback, MouseEvent } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { 
    Play, Pause, Volume2, VolumeX, Maximize, Minimize, SkipBack, SkipForward, Settings, Notebook, FileText, Link as LinkIcon, X, Move, CornerDownRight, ArrowRightFromLine, ArrowDownFromLine
} from 'lucide-react';
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuPortal,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import type { LectureNote } from '@/lib/types';
import FloatingPdfViewer from './floating-pdf-viewer'; // Keep this for now, we will replace its usage

interface CustomVideoPlayerProps {
    src: string;
    sdSrc?: string;
    poster: string;
    notes: LectureNote[];
    onSelectPdf: (url: string) => void;
}

type Quality = 'hd' | 'sd';
type SidebarPosition = 'right' | 'bottom';


const NotesSidebar = ({ 
    notes, 
    position, 
    size, 
    onClose, 
    onPositionChange, 
    onResize,
    onSelectNote
}: {
    notes: LectureNote[],
    position: SidebarPosition,
    size: number,
    onClose: () => void,
    onPositionChange: (pos: SidebarPosition) => void,
    onResize: (newSize: number) => void,
    onSelectNote: (note: LectureNote) => void
}) => {
    const [isResizing, setIsResizing] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const resizeStartPos = useRef(0);
    const initialSize = useRef(0);

    const handleResizeStart = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setIsResizing(true);
        resizeStartPos.current = position === 'right' ? e.clientX : e.clientY;
        initialSize.current = size;
        document.body.style.cursor = position === 'right' ? 'ew-resize' : 'ns-resize';
        document.body.style.userSelect = 'none';
    };

    useEffect(() => {
        const handleGlobalMouseMove = (e: globalThis.MouseEvent) => {
            if (isResizing) {
                const delta = position === 'right' 
                    ? resizeStartPos.current - e.clientX
                    : resizeStartPos.current - e.clientY;
                const newSize = initialSize.current + delta;
                onResize(newSize);
            }
        };

        const handleGlobalMouseUp = () => {
            setIsResizing(false);
            document.body.style.cursor = 'default';
            document.body.style.userSelect = 'auto';
        };

        window.addEventListener('mousemove', handleGlobalMouseMove);
        window.addEventListener('mouseup', handleGlobalMouseUp);
        return () => {
            window.removeEventListener('mousemove', handleGlobalMouseMove);
            window.removeEventListener('mouseup', handleGlobalMouseUp);
        };
    }, [isResizing, position, onResize]);

    return (
        <div
            ref={sidebarRef}
            className={cn(
                "absolute z-20 bg-background/90 backdrop-blur-sm flex flex-col text-foreground",
                position === 'right' ? 'top-0 right-0 h-full' : 'bottom-0 left-0 w-full'
            )}
            style={{
                width: position === 'right' ? `${size}px` : '100%',
                height: position === 'bottom' ? `${size}px` : '100%'
            }}
        >
            <div className="flex items-center justify-between p-1 border-b border-border text-xs">
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => onPositionChange('right')}>
                        <ArrowRightFromLine className={cn("h-4 w-4", position === 'right' && "text-primary")} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => onPositionChange('bottom')}>
                        <ArrowDownFromLine className={cn("h-4 w-4", position === 'bottom' && "text-primary")} />
                    </Button>
                </div>
                <span className="font-semibold">Notes</span>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={onClose}>
                    <X className="h-4 w-4" />
                </Button>
            </div>
            <div className="flex-grow overflow-y-auto p-2 space-y-2">
                {notes.map(note => (
                    <button
                        key={note.id}
                        onClick={() => onSelectNote(note)}
                        className="flex w-full items-center gap-3 p-2 rounded-md bg-muted/50 hover:bg-muted transition-colors text-left"
                    >
                        {note.type === 'pdf' ? <FileText className="h-5 w-5 text-primary flex-shrink-0" /> : <LinkIcon className="h-5 w-5 text-primary flex-shrink-0" />}
                        <span className="font-medium text-sm truncate">{note.name}</span>
                    </button>
                ))}
            </div>
            <button
                onMouseDown={handleResizeStart}
                className={cn(
                    "absolute bg-muted hover:bg-accent transition-colors",
                    position === 'right' ? "top-0 left-0 h-full w-1.5 cursor-ew-resize" : "top-0 left-0 w-full h-1.5 cursor-ns-resize"
                )}
            />
        </div>
    );
};

export default function CustomVideoPlayer({ src, sdSrc, poster, notes, onSelectPdf }: CustomVideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const playerRef = useRef<HTMLDivElement>(null);
    const timeRef = useRef<number>(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [quality, setQuality] = useState<Quality>('hd');
    
    // States for the new sidebar
    const [isNotesSidebarOpen, setIsNotesSidebarOpen] = useState(false);
    const [sidebarPosition, setSidebarPosition] = useState<SidebarPosition>('right');
    const [sidebarSize, setSidebarSize] = useState(400); // Initial width or height
    const [selectedNoteForViewer, setSelectedNoteForViewer] = useState<LectureNote | null>(null);

    let controlsTimeout: NodeJS.Timeout;

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handlePlayPause = useCallback(() => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
        }
    }, []);
    
    const handleVolumeChange = (value: number[]) => {
        if (videoRef.current) {
            const newVolume = value[0];
            videoRef.current.volume = newVolume;
            setVolume(newVolume);
            if (newVolume > 0) {
                setIsMuted(false);
                videoRef.current.muted = false;
            }
        }
    };
    
    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handleProgressChange = (value: number[]) => {
        if (videoRef.current) {
            const newTime = (value[0] / 100) * duration;
            videoRef.current.currentTime = newTime;
        }
    };
    
    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setProgress((videoRef.current.currentTime / duration) * 100);
        }
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
            videoRef.current.currentTime = timeRef.current;
        }
    };

    const handlePlaybackRateChange = (rate: number) => {
        if (videoRef.current) {
            videoRef.current.playbackRate = rate;
            setPlaybackRate(rate);
        }
    };

    const handleQualityChange = (newQuality: Quality) => {
        if (videoRef.current && quality !== newQuality) {
            timeRef.current = videoRef.current.currentTime;
            setQuality(newQuality);
        }
    };

    const toggleFullscreen = useCallback(() => {
        if (!playerRef.current) return;

        if (!document.fullscreenElement) {
            playerRef.current.requestFullscreen().catch(err => {
                alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else {
            document.exitFullscreen();
        }
    }, []);

    const handleSelectNoteInSidebar = (note: LectureNote) => {
        if (note.type === 'pdf') {
            onSelectPdf(note.url);
            // This will open the external floating viewer from the parent
            // We no longer embed the viewer here to keep it simple and robust
        } else {
            window.open(note.url, '_blank');
        }
    };


    const handleSeek = useCallback((amount: number) => {
        if (videoRef.current) {
            videoRef.current.currentTime += amount;
        }
    }, []);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if ((e.target as HTMLElement).tagName === 'INPUT' || (e.target as HTMLElement).tagName === 'TEXTAREA') return;

        switch(e.key) {
            case ' ':
            case 'k':
                e.preventDefault();
                handlePlayPause();
                break;
            case 'm':
                toggleMute();
                break;
            case 'f':
                toggleFullscreen();
                break;
            case 'ArrowRight':
                handleSeek(5);
                break;
            case 'ArrowLeft':
                handleSeek(-5);
                break;
        }
    }, [handlePlayPause, toggleFullscreen, handleSeek]);

    const handleMouseMove = () => {
        setShowControls(true);
        clearTimeout(controlsTimeout);
        controlsTimeout = setTimeout(() => {
            if (isPlaying && !isNotesSidebarOpen) { // Don't hide controls if sidebar is open
                 setShowControls(false);
            }
        }, 3000);
    };

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        
        video.addEventListener('play', () => setIsPlaying(true));
        video.addEventListener('pause', () => setIsPlaying(false));
        video.addEventListener('ended', () => setIsPlaying(false));
        
        const player = playerRef.current;
        if (player) {
            const fullscreenChangeHandler = () => setIsFullscreen(!!document.fullscreenElement);
            player.addEventListener('fullscreenchange', fullscreenChangeHandler);
            player.addEventListener('keydown', handleKeyDown);

            return () => {
                player.removeEventListener('fullscreenchange', fullscreenChangeHandler);
                player.removeEventListener('keydown', handleKeyDown);
            };
        }

        return () => {
            video.removeEventListener('play', () => setIsPlaying(true));
            video.removeEventListener('pause', () => setIsPlaying(false));
            video.removeEventListener('ended', () => setIsPlaying(false));
        }
    }, [handleKeyDown]);

    const activeSrc = quality === 'hd' ? src : sdSrc || src;

    return (
        <div ref={playerRef} className="relative w-full aspect-video bg-black rounded-lg overflow-hidden group" onMouseMove={handleMouseMove}>
            <video
                key={activeSrc}
                ref={videoRef}
                src={activeSrc}
                poster={poster}
                className="w-full h-full"
                onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={handleTimeUpdate}
                onClick={handlePlayPause}
                onDoubleClick={toggleFullscreen}
                autoPlay={isPlaying}
            >
                Your browser does not support the video tag.
            </video>

            <div className={cn("absolute inset-0 flex items-center justify-center transition-opacity", 
                isPlaying ? 'opacity-0' : 'opacity-100 bg-black/30'
            )}>
                 <Button variant="ghost" size="icon" className="h-20 w-20 rounded-full" onClick={handlePlayPause}>
                    <Play className="h-10 w-10 text-white" />
                </Button>
            </div>
            
             <div className={cn("absolute top-0 left-0 right-0 p-4 transition-opacity duration-300 z-10", showControls ? 'opacity-100' : 'opacity-0')}>
                <div className="flex justify-end">
                     <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 hover:text-white" onClick={() => setIsNotesSidebarOpen(prev => !prev)}>
                        <Notebook className="mr-2 h-4 w-4" />
                        Notes
                    </Button>
                </div>
            </div>
            
            {isNotesSidebarOpen && (
                <NotesSidebar
                    notes={notes}
                    position={sidebarPosition}
                    size={sidebarSize}
                    onClose={() => setIsNotesSidebarOpen(false)}
                    onPositionChange={setSidebarPosition}
                    onResize={setSidebarSize}
                    onSelectNote={handleSelectNoteInSidebar}
                />
            )}

            <div className={cn("absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300", 
                 showControls ? 'opacity-100' : 'opacity-0'
            )}>
                <div className="flex items-center gap-2 sm:gap-4 text-white">
                    <Button variant="ghost" size="icon" onClick={handlePlayPause}>
                        {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                    </Button>

                    <Button variant="ghost" size="icon" onClick={() => handleSeek(-10)}>
                        <SkipBack className="h-5 w-5" />
                    </Button>

                     <Button variant="ghost" size="icon" onClick={() => handleSeek(10)}>
                        <SkipForward className="h-5 w-5" />
                    </Button>
                    
                     <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleMute}>
                           {isMuted || volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                        </Button>
                        <Slider
                            value={[isMuted ? 0 : volume]}
                            onValueChange={handleVolumeChange}
                            max={1}
                            step={0.1}
                            className="w-24 hidden sm:flex"
                        />
                    </div>

                    <span className="text-sm font-mono">{formatTime(videoRef.current?.currentTime || 0)} / {formatTime(duration)}</span>

                    <div className="flex-grow mx-2 sm:mx-4">
                        <Slider
                            value={[progress]}
                            onValueChange={handleProgressChange}
                            max={100}
                            step={0.1}
                            className="w-full"
                        />
                    </div>
                    
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="font-mono">{playbackRate}x</Button>
                        </DropdownMenuTrigger>
                         <DropdownMenuPortal container={playerRef.current ?? undefined}>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>Playback Speed</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {[0.5, 0.75, 1, 1.25, 1.5, 2].map(rate => (
                                    <DropdownMenuItem key={rate} onSelect={() => handlePlaybackRateChange(rate)}>
                                        {rate}x
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenuPortal>
                    </DropdownMenu>

                     {sdSrc && (
                         <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Settings className="h-5 w-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuPortal container={playerRef.current ?? undefined}>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>Quality</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuRadioGroup value={quality} onValueChange={(q) => handleQualityChange(q as Quality)}>
                                        <DropdownMenuRadioItem value="hd">HD (1080p)</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="sd">SD (480p)</DropdownMenuRadioItem>
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                            </DropdownMenuPortal>
                        </DropdownMenu>
                    )}

                    <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
                        {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
                    </Button>
                </div>
            </div>
        </div>
    );
}
