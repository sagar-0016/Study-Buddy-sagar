import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Flame } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tricky Topics',
};

export default function TrickyTopicsPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="mx-auto bg-primary/10 p-4 rounded-full">
            <Flame className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="mt-4">Tricky Topics Section Coming Soon!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            A dedicated space for all those confusing topics and exceptions is on its way. You'll be able to share and discuss them here!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
