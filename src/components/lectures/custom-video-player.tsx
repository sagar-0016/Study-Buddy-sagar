
"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { 
    Play, Pause, Volume2, VolumeX, Maximize, Minimize, SkipBack, SkipForward, Settings, Notebook, FileText, Link as LinkIcon
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

interface CustomVideoPlayerProps {
    src: string;
    sdSrc?: string;
    poster: string;
    notes: LectureNote[];
    onSelectPdf: (url: string) => void;
}

type Quality = 'hd' | 'sd';

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
            if (isPlaying) {
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
            player.addEventListener('fullscreenchange', () => setIsFullscreen(!!document.fullscreenElement));
            player.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            video.removeEventListener('play', () => setIsPlaying(true));
            video.removeEventListener('pause', () => setIsPlaying(false));
            video.removeEventListener('ended', () => setIsPlaying(false));
            if (player) {
                player.removeEventListener('fullscreenchange', () => setIsFullscreen(!!document.fullscreenElement));
                player.removeEventListener('keydown', handleKeyDown);
            }
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
            
             <div className={cn("absolute top-0 left-0 right-0 p-4 transition-opacity duration-300", showControls ? 'opacity-100' : 'opacity-0')}>
                <div className="flex justify-end">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="sm">
                                <Notebook className="mr-2 h-4 w-4" />
                                Notes
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuPortal container={playerRef.current}>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>Lecture Materials</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {notes.length > 0 ? (
                                    notes.map(note => (
                                        <DropdownMenuItem key={note.id} onSelect={(e) => {
                                            e.preventDefault();
                                            if (note.type === 'pdf') {
                                                onSelectPdf(note.url)
                                            } else {
                                                window.open(note.url, '_blank')
                                            }
                                        }}>
                                            {note.type === 'pdf' ? <FileText className="mr-2 h-4 w-4" /> : <LinkIcon className="mr-2 h-4 w-4" />}
                                            {note.name}
                                        </DropdownMenuItem>
                                    ))
                                ) : (
                                    <DropdownMenuItem disabled>No notes available</DropdownMenuItem>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenuPortal>
                    </DropdownMenu>
                </div>
            </div>

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
                         <DropdownMenuPortal container={playerRef.current}>
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
                            <DropdownMenuPortal container={playerRef.current}>
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
