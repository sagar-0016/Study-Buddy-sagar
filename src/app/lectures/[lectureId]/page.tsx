
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getLectureById } from '@/lib/lectures';
import LectureView from '@/components/lectures/lecture-view';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface LecturePageProps {
  params: {
    lectureId: string;
  };
}

export async function generateMetadata({ params }: LecturePageProps): Promise<Metadata> {
  const lecture = await getLectureById(params.lectureId);

  if (!lecture) {
    return {
      title: 'Lecture Not Found',
    };
  }

  return {
    title: `${lecture.title} | Lecture`,
    description: lecture.description,
  };
}

export default async function LecturePage({ params }: LecturePageProps) {
  const lecture = await getLectureById(params.lectureId);

  if (!lecture) {
    notFound();
  }

  return (
    <div className="space-y-6">
        <div className="flex justify-start">
             <Button asChild variant="outline">
                <Link href="/lectures">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Library
                </Link>
            </Button>
        </div>
        <LectureView lecture={lecture} />
    </div>
  );
