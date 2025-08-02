
"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getMotivationAction } from "@/lib/actions";
import { Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const moods = [
  { emoji: "💪", label: "Motivated" },
  { emoji: "😟", label: "Worried" },
  { emoji: "😐", label: "Focused" },
];

export default function MotivationCorner() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [motivation, setMotivation] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleMoodSelect = async (moodLabel: string) => {
    setSelectedMood(moodLabel);
    setIsLoading(true);
    setMotivation("");
    try {
      const result = await getMotivationAction({
        senderName: "Saurabh",
        recipientName: "Pranjal",
        topic: "JEE Prep",
        quizScore: 75,
        currentMood: moodLabel,
      });
      setMotivation(result.motivation);
    } catch (error) {
      console.error("Failed to get motivation:", error);
      setMotivation("Oops! Saurabh is busy studying... maybe try again later?");
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
              className={cn("flex flex-col h-20 text-base", {
                "border-0": selectedMood !== mood.label,
              })}
              onClick={() => handleMoodSelect(mood.label)}
            >
              <span className="text-3xl">{mood.emoji}</span>
              <span className="mt-1">{mood.label}</span>
            </Button>
          ))}
        </div>

        {isLoading && (
            <div className="flex items-center justify-center p-4">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
        )}

        {motivation && !isLoading && (
          <div className="p-4 bg-accent/10 rounded-lg text-accent-foreground border-l-4 border-accent max-w-2xl mx-auto animate-in fade-in-50 duration-500">
            <div className="flex items-start">
              <Sparkles className="h-5 w-5 mr-3 mt-1 text-accent flex-shrink-0" />
              <p className="italic">"{motivation}"</p>
            </div>
            <p className="text-right font-semibold mt-2">- Saurabh</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
