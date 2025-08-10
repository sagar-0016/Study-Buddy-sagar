
"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getMotivationAction } from "@/lib/actions";
import { Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "@/hooks/use-local-storage";
import type { MotivationMode } from "@/components/settings/settings-page";
import { getRandomMotivationByMood } from "@/lib/motivation";

const moods = [
  { emoji: "✨", label: "Motivated" },
  { emoji: "🧘‍♀️", label: "Focused" },
  { emoji: "🥀", label: "Worried" },
];

export default function MotivationCorner() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [motivation, setMotivation] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAiGenerated, setIsAiGenerated] = useState(false);
  const [motivationMode] = useLocalStorage<MotivationMode>('motivation-mode', 'mixed');

  const handleMoodSelect = async (moodLabel: string) => {
    setSelectedMood(moodLabel);
    setIsLoading(true);
    setMotivation("");
    setIsAiGenerated(false);

    try {
        let useAi = false;
        if (motivationMode === 'ai') {
            useAi = true;
        } else if (motivationMode === 'mixed') {
            useAi = Math.random() < 0.5;
        }

        if (useAi) {
            const result = await getMotivationAction({
                senderName: "Saurabh",
                recipientName: "Pranjal",
                topic: "JEE Prep",
                quizScore: 75,
                currentMood: moodLabel,
            });
            setMotivation(result.motivation);
            setIsAiGenerated(true);
        } else {
            const personalQuote = await getRandomMotivationByMood(moodLabel);
            setMotivation(personalQuote);
            setIsAiGenerated(false);
        }
    } catch (error) {
        console.error("Failed to get motivation:", error);
        setMotivation("Oops! Something went wrong. But you've got this, keep going!");
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <Card className="flex flex-col transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg border-0">
      <CardContent className="flex-grow space-y-4 pt-6">
        <p className="text-lg font-medium text-center">How are you feeling, Pranjal?</p>
        <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
          {moods.map((mood) => (
            <Button
              key={mood.label}
              variant={selectedMood === mood.label ? "default" : "outline"}
              className={cn(
                "flex flex-col h-20 text-base hover:bg-muted px-2 sm:px-10",
                {
                  "border-primary bg-primary/10 text-primary": selectedMood === mood.label,
                }
              )}
              onClick={() => handleMoodSelect(mood.label)}
            >
              <span className="text-3xl">{mood.emoji}</span>
              <span className="mt-1 text-xs sm:text-sm">{mood.label}</span>
            </Button>
          ))}
        </div>

        {isLoading && (
            <div className="flex items-center justify-center p-4">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
        )}

        {motivation && !isLoading && (
          <div className="p-4 bg-accent/10 rounded-lg text-foreground border-l-4 border-accent max-w-2xl mx-auto animate-in fade-in-50 duration-500">
            <div className="flex items-start">
              <Sparkles className="h-5 w-5 mr-3 mt-1 text-accent flex-shrink-0" />
              <p className="italic">"{motivation}"</p>
            </div>
            {isAiGenerated && (
                <div className="flex justify-end mt-2">
                    <span className="text-xs font-semibold bg-muted text-muted-foreground px-2 py-1 rounded-full">AI</span>
                </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
