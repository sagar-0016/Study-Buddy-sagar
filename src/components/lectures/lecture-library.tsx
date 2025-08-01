
"use client";

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getLectures } from '@/lib/lectures';
import type { Lecture } from '@/lib/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Clapperboard, Youtube } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const LectureCard = ({ lecture }: { lecture: Lecture }) => {
  return (
    <Link href={lecture.videoUrl} target="_blank" rel="noopener noreferrer" className="block group">
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col">
        <div className="relative aspect-video">
          <Image 
            src={lecture.thumbnailUrl} 
            alt={`Thumbnail for ${lecture.title}`} 
            fill 
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
           <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
            <Youtube className="h-12 w-12 text-white/80 group-hover:text-white group-hover:scale-110 transition-transform" />
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

  useEffect(() => {
    const fetchLectures = async () => {
      setIsLoading(true);
      const fetchedLectures = await getLectures();
      setLectures(fetchedLectures);
      setIsLoading(false);
    };
    fetchLectures();
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

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input 
          placeholder="Search for lectures by title, subject, or channel..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 w-full"
        />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-2">
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : filteredLectures.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredLectures.map(lecture => (
            <LectureCard key={lecture.id} lecture={lecture} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg min-h-[40vh]">
          <Clapperboard className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold">No Lectures Found</h3>
          <p className="text-muted-foreground">Try adjusting your search term or adding more lectures to the database.</p>
        </div>
      )}
    </div>
  );
}
