
"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";

const priorityLevels: Record<number, { label: string; description: string; color: string }> = {
    1: { label: 'Priority 1', description: 'Comes almost every year with more than 2 questions on average', color: 'bg-red-500' },
    2: { label: 'Priority 2', description: 'Comes every year but with variable occurrence (>1 question on average)', color: 'bg-orange-500' },
    3: { label: 'Priority 3', description: 'Almost always 1 question each year', color: 'bg-yellow-500' },
    4: { label: 'Priority 4', description: 'Rarely appears, but sometimes has 2 or more questions in a year', color: 'bg-green-500' },
    5: { label: 'Priority 5', description: 'Quite rare to even have one question', color: 'bg-blue-500' },
};

export function PriorityLegend() {
  return (
    <Popover>
        <PopoverTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer text-muted-foreground hover:text-foreground transition-colors">
                 <div className="flex items-center space-x-1.5">
                    {Object.values(priorityLevels).map((level) => (
                        <div
                        key={level.label}
                        className={cn("h-3 w-3 rounded-full", level.color)}
                        />
                    ))}
                </div>
                <Info className="h-4 w-4" />
                <span className="text-sm font-medium">Priority Key</span>
            </div>
        </PopoverTrigger>
        <PopoverContent className="w-80">
            <div className="grid gap-4">
                <div className="space-y-2">
                    <h4 className="font-medium leading-none">Priority Legend</h4>
                    <p className="text-sm text-muted-foreground">
                        Hover over a chapter's dot to see its specific priority.
                    </p>
                </div>
                <div className="grid gap-2">
                   {Object.values(priorityLevels).map(level => (
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
