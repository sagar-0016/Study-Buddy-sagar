
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BrainCircuit } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Revisions',
};

export default function RevisionsPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="mx-auto bg-primary/10 p-4 rounded-full">
            <BrainCircuit className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="mt-4">Revision Centre Coming Soon!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            A dedicated space to master your tricky topics with smart recall is being built. Get ready to conquer your revisions!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
