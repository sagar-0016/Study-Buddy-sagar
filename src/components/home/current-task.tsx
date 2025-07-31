import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Clock } from "lucide-react";

export default function CurrentTask() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Task</CardTitle>
        <CardDescription>What's next on your study plan.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-primary/5 rounded-lg">
          <div className="flex items-center text-primary font-semibold">
            <Clock className="h-5 w-5 mr-2" />
            <p>10:00 AM - 11:30 AM</p>
          </div>
          <h3 className="text-xl font-bold mt-2">Physics: Rotational Motion</h3>
          <p className="text-muted-foreground mt-1">
            Revise key concepts and solve 10 practice problems.
          </p>
        </div>
        <div className="flex gap-2">
            <Button variant="default" className="w-full">Start Studying</Button>
            <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
