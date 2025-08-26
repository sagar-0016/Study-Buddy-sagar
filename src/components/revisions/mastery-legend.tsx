
"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";

export const masteryLevels = [
    { level: 1, label: 'Brand New', description: 'Not enough data. Let\'s see how well you know this.', color: 'bg-gray-400' },
    { level: 2, label: 'Critical', description: 'Very low success rate. This is a top priority for review.', color: 'bg-red-600' },
    { level: 3, label: 'Needs Work', description: 'You\'re struggling with this one. Let\'s practice it more often.', color: 'bg-orange-500' },
    { level: 4, label: 'Inconsistent', description: 'You get this right about half the time. A little more focus is needed.', color: 'bg-yellow-500' },
    { level: 5, label: 'Getting There', description: 'Good progress! You\'re starting to understand this topic well.', color: 'bg-yellow-400' },
    { level: 6, label: 'Solid', description: 'You have a strong grasp of this topic. Keep it fresh!', color: 'bg-green-400' },
    { level: 7, label: 'Mastered', description: 'Excellent! You consistently recall this topic correctly.', color: 'bg-green-500' },
];

export function MasteryLegend() {
  return (
    <Popover>
        <PopoverTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer text-muted-foreground hover:text-foreground transition-colors">
                 <div className="flex items-center space-x-1.5">
                    {masteryLevels.map(level => (
                         <div key={level.level} className={cn("h-3 w-3 rounded-full", level.color)} />
                    ))}
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
