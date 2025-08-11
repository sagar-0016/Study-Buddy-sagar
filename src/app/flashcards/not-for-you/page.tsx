
import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Ban, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Not For You',
};

export default function NotForYouPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <Card className="w-full max-w-md animate-in fade-in-50 zoom-in-90 duration-500">
        <CardHeader>
          <div className="mx-auto bg-destructive/10 p-4 rounded-full">
            <Ban className="h-12 w-12 text-destructive" />
          </div>
          <CardTitle className="mt-4 text-2xl font-bold">Yeh aapkey liye nhi hai :)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This flashcard deck is not available for you. Let's go back and pick another one.
          </p>
          <Button variant="outline" className="mt-6" asChild>
            <Link href="/flashcards">
              <ArrowLeft className="mr-2 h-4 w-4" /> Go Back to Decks
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
