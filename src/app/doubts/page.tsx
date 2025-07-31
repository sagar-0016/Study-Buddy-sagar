import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquareQuestion } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Doubt Centre',
};

export default function DoubtsPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="mx-auto bg-primary/10 p-4 rounded-full">
            <MessageSquareQuestion className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="mt-4">Doubt Centre Coming Soon!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            A forum to ask questions and get answers from peers and experts is being built. Get ready to clear all your doubts!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
