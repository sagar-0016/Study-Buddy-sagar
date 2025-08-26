
"use client";

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getLectures } from '@/lib/lecture-data';
import type { Lecture } from '@/lib/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Clapperboard, Play, Ban } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const LectureCard = ({ lecture }: { lecture: Lecture }) => {
  return (
    <Link href={`/lectures/${lecture.id}`} className="block group">
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col border-0">
            <div className="relative aspect-video">
            <Image 
                src={lecture.thumbnailUrl} 
                alt={`Thumbnail for ${lecture.title}`} 
                fill 
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <Play className="h-12 w-12 text-white/80 group-hover:text-white group-hover:scale-110 transition-transform" />
            </div>
            <Badge className="absolute bottom-2 right-2 bg-black/70 text-white border-none text-xs">{lecture.duration}</Badge>
            </div>
            <CardContent className="p-4 flex-grow">
            <Badge variant={lecture.subject === 'Physics' ? 'default' : lecture.subject === 'Chemistry' ? 'destructive' : 'secondary'} className="mb-2">
                {lecture.subject}
            </Badge>
            <h3 className="font-semibold text-base line-clamp-2">{lecture.title}</h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-3">{lecture.description}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
                <p className="text-xs text-muted-foreground font-medium">{lecture.channel}</p>
            </CardFooter>
        </Card>
    </Link>
  );
};

export default function LectureLibrary() {
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [accessLevel, setAccessLevel] = useState<string | null>(null);

  useEffect(() => {
    const level = localStorage.getItem('study-buddy-access-level');
    setAccessLevel(level);

    if (level === 'full') {
      const fetchLectures = async () => {
        setIsLoading(true);
        const fetchedLectures = await getLectures();
        setLectures(fetchedLectures);
        setIsLoading(false);
      };
      fetchLectures();
    } else {
      setIsLoading(false);
    }
  }, []);

  const filteredLectures = useMemo(() => {
    if (!searchTerm) return lectures;
    const lowercasedTerm = searchTerm.toLowerCase();
    return lectures.filter(lecture => 
      lecture.title.toLowerCase().includes(lowercasedTerm) ||
      lecture.description.toLowerCase().includes(lowercasedTerm) ||
      lecture.subject.toLowerCase().includes(lowercasedTerm) ||
      lecture.channel.toLowerCase().includes(lowercasedTerm)
    );
  }, [lectures, searchTerm]);

  if (isLoading) {
    return (
        <div className="space-y-6">
             <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                <Skeleton className="h-10 w-full sm:flex-1" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
                <div key={i} className="space-y-2">
                    <Skeleton className="h-40 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                </div>
            ))}
            </div>
        </div>
    );
  }

  if (accessLevel !== 'full') {
    return (
        <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg min-h-[40vh]">
            <Ban className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold">Access Denied</h3>
            <p className="text-muted-foreground">This feature is available for authorized users only.</p>
        </div>
    )
  }

  return (
    <div className="space-y-6">
       <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
                placeholder="Search for lectures by title, subject, or channel..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
            />
        </div>
      </div>

      {filteredLectures.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredLectures.map(lecture => (
            <LectureCard key={lecture.id} lecture={lecture} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg min-h-[40vh]">
          <Clapperboard className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold">No Lectures Found</h3>
          <p className="text-muted-foreground">Try adjusting your search or check back later for new content.</p>
        </div>
      )}
    </div>
  );
}
