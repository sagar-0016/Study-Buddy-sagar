
"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const priorityLevels: Record<number, { label: string; description: string; color: string }> = {
    1: { label: 'Priority 1', description: 'Comes almost every year with more than 2 questions on average', color: 'bg-red-500' },
    2: { label: 'Priority 2', description: 'Comes every year but with variable occurrence (>1 question on average)', color: 'bg-orange-500' },
    3: { label: 'Priority 3', description: 'Almost always 1 question each year', color: 'bg-yellow-500' },
    4: { label: 'Priority 4', description: 'Rarely appears, but sometimes has 2 or more questions in a year', color: 'bg-green-500' },
    5: { label: 'Priority 5', description: 'Quite rare to even have one question', color: 'bg-blue-500' },
};

export function PriorityDot({ priority }: { priority: number }) {
  const priorityInfo = priorityLevels[priority] || { label: 'Unknown', description: 'No priority data available', color: 'bg-muted' };

  return (
    <TooltipProvider delayDuration={100}>
        <Tooltip>
            <TooltipTrigger asChild>
                <div
                className={cn(
                    "h-3 w-3 rounded-full transition-all duration-200 ring-offset-background ring-offset-2 focus:ring-2 focus:ring-ring",
                    priorityInfo.color
                )}
                />
            </TooltipTrigger>
            <TooltipContent>
                <p className="font-bold">{priorityInfo.label}</p>
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
  );
}
