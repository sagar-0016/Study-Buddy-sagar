import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LifeBuoy } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Help',
};

export default function HelpPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="mx-auto bg-primary/10 p-4 rounded-full">
            <LifeBuoy className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="mt-4">Help Section Coming Soon!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Need assistance? A direct line to tutors and support staff is under construction. Help will be just a message away!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
