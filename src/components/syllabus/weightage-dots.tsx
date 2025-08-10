
"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const weightageLevels: Record<number, { label: string; description: string; color: string }> = {
    1: { label: 'Level 1', description: 'Comes almost every year with more than 2 questions on average', color: 'bg-red-500' },
    2: { label: 'Level 2', description: 'Comes every year but with variable occurrence (>1 question on average)', color: 'bg-orange-500' },
    3: { label: 'Level 3', description: 'Almost always 1 question each year', color: 'bg-yellow-500' },
    4: { label: 'Level 4', description: 'Rarely appears, but sometimes has 2 or more questions in a year', color: 'bg-green-500' },
    5: { label: 'Level 5', description: 'Quite rare to even have one question', color: 'bg-blue-500' },
};

export function WeightageDots({ weightage }: { weightage: number }) {
  return (
    <TooltipProvider delayDuration={100}>
      <div className="flex items-center space-x-1.5">
        {Object.entries(weightageLevels).map(([level, { label, description, color }]) => {
          const isActive = parseInt(level, 10) === weightage;
          return (
            <Tooltip key={level}>
              <TooltipTrigger asChild>
                <div
                  className={cn(
                    "h-3 w-3 rounded-full transition-all duration-200",
                    isActive ? color : "bg-muted hover:bg-muted-foreground/50",
                    isActive && "ring-2 ring-offset-2 ring-offset-background ring-primary"
                  )}
                />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p className="font-bold">{label}</p>
                <p className="text-sm text-muted-foreground">{description}</p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
}
