import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

export default function CurrentTask() {
  return (
    <Card className="transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg border-0">
      <CardHeader>
        <CardTitle>Current Task</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-primary/5 rounded-lg">
          <div className="flex items-center text-primary font-semibold">
            <Clock className="h-5 w-5 mr-2" />
            <p>10:00 AM - 11:30 AM</p>
          </div>
          <h3 className="text-xl font-bold mt-2">Physics: Rotational Motion</h3>
        </div>
        
        <p className="text-muted-foreground font-semibold px-1 pt-2">Upcoming...</p>

        <div className="p-4 bg-primary/5 rounded-lg">
          <div className="flex items-center text-primary font-semibold">
            <Clock className="h-5 w-5 mr-2" />
            <p>12:00 PM - 01:30 PM</p>
          </div>
          <h3 className="text-xl font-bold mt-2">Chemistry: Chemical Bonding</h3>
        </div>
      </CardContent>
    </Card>
  );
}
