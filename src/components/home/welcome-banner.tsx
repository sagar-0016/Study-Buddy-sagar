import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function WelcomeBanner() {
  return (
    <Card className="relative overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center">
          <div className="z-10">
            <h2 className="text-2xl font-bold">Welcome back, Pranjal!</h2>
            <p className="text-muted-foreground mt-1">
              Let's make today a productive day. You've got this!
            </p>
          </div>
          <div className="absolute -right-10 -bottom-16 opacity-10 dark:opacity-5 pointer-events-none">
            <Image
                src="https://placehold.co/300x300.png"
                alt="Abstract background"
                data-ai-hint="abstract geometric"
                width={300}
                height={300}
              />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
