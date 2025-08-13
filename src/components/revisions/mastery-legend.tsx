
"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";

const masteryLevels = [
    { label: 'Needs Practice', description: 'Low success rate. These topics should be a high priority for your next recall session.', color: 'bg-red-500' },
    { label: 'Reviewing', description: 'You are making progress but haven\'t fully mastered the topic yet. Keep reviewing!', color: 'bg-yellow-500' },
    { label: 'Mastered', description: 'High success rate! You have a strong grasp of this topic.', color: 'bg-green-500' },
    { label: 'Not enough data', description: 'This topic has not been attempted enough times to determine a mastery level.', color: 'bg-gray-400' },
];

export function MasteryLegend() {
  return (
    <Popover>
        <PopoverTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer text-muted-foreground hover:text-foreground transition-colors">
                 <div className="flex items-center space-x-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500" />
                    <div className="h-3 w-3 rounded-full bg-green-500" />
                    <div className="h-3 w-3 rounded-full bg-gray-400" />
                </div>
                <Info className="h-4 w-4" />
                <span className="text-sm font-medium">Mastery Key</span>
            </div>
        </PopoverTrigger>
        <PopoverContent className="w-80">
            <div className="grid gap-4">
                <div className="space-y-2">
                    <h4 className="font-medium leading-none">Mastery Legend</h4>
                    <p className="text-sm text-muted-foreground">
                        The color of the dot next to each topic indicates your recall performance.
                    </p>
                </div>
                <div className="grid gap-3">
                   {masteryLevels.map(level => (
                     <div key={level.label} className="grid grid-cols-[20px_1fr] items-start gap-x-3">
                        <div className={cn("h-3 w-3 rounded-full mt-1", level.color)} />
                        <div>
                            <p className="text-sm font-medium leading-none">{level.label}</p>
                            <p className="text-sm text-muted-foreground">{level.description}</p>
                        </div>
                    </div>
                   ))}
                </div>
            </div>
        </PopoverContent>
    </Popover>
  );
}
