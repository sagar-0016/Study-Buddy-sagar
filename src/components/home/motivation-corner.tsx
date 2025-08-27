
"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getMotivationAction } from "@/lib/actions";
import { Loader2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "@/hooks/use-local-storage";
import type { MotivationMode } from "@/components/settings/settings-page";
import { getRandomMotivationByMood, getTinkeringMessage, getThreateningMessage, markMotivationAsRead } from "@/lib/motivation";
import { useToast } from "@/hooks/use-toast";
import { logMood } from "@/lib/mood-tracker";

const moods = [
  { emoji: "✨", label: "Motivated" },
  { emoji: "🧘‍♀️", label: "Focused" },
  { emoji: "🥀", label: "Worried" },
];

const TINKERING_THRESHOLD = 4;
const THREATENING_THRESHOLD = 7;
const TIME_WINDOW = 5 * 60 * 1000; // 5 minutes in milliseconds

export default function MotivationCorner() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [motivation, setMotivation] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAiGenerated, setIsAiGenerated] = useState(false);
  const [warningLevel, setWarningLevel] = useState<null | 'orange' | 'red'>(null);
  const [motivationMode] = useLocalStorage<MotivationMode>('motivation-mode', 'mixed');
  const [timestamps, setTimestamps] = useLocalStorage<number[]>('motivation-timestamps', []);
  const { toast } = useToast();
  
  const handleMoodSelect = async (moodLabel: string) => {
    setSelectedMood(moodLabel);
    setIsLoading(true);
    setMotivation("");
    setIsAiGenerated(false);
    setWarningLevel(null);
    
    const accessLevel = localStorage.getItem('study-buddy-access-level') as 'full' | 'limited' | null;
    const now = Date.now();
    const isProduction = window.location.href.includes("study-buddy-two-phi.vercel.app");
    
    // --- Guest User Logic ---
    if (accessLevel !== 'full') {
      if (timestamps.length > 0) {
        toast({
          title: "Feature Usage Capped",
        });
        setIsLoading(false); // Stop loading as we are returning early
        return;
      }
      setTimestamps([now]); // Allow one-time use for guests
    }

    let currentTimestamps: number[] = [];
    if (accessLevel === 'full') {
        const updatedTimestamps = [...timestamps, now].filter(ts => now - ts < TIME_WINDOW);
        setTimestamps(updatedTimestamps);
        currentTimestamps = updatedTimestamps;
    }
    
    const attemptsInWindow = currentTimestamps.length;
    let newWarningLevel: 'orange' | 'red' | null = null;
    let finalMessage: string;
    
    try {
      if (accessLevel === 'full' && attemptsInWindow >= THREATENING_THRESHOLD) {
          newWarningLevel = 'red';
          finalMessage = await getThreateningMessage();
      } else if (accessLevel === 'full' && attemptsInWindow >= TINKERING_THRESHOLD) {
          newWarningLevel = 'orange';
          finalMessage = await getTinkeringMessage();
      } else {
          const useAi = motivationMode === 'ai' || (motivationMode === 'mixed' && Math.random() < 0.5);
          if (useAi && accessLevel === 'full') {
              setIsAiGenerated(true);
              const result = await getMotivationAction({
                  senderName: "Saurabh",
                  recipientName: "Pranjal",
                  topic: "JEE Prep",
                  quizScore: 75,
                  currentMood: moodLabel,
              });
              finalMessage = result.motivation;
              // AI messages don't have a read status to update
          } else {
              setIsAiGenerated(false);
              const messageData = await getRandomMotivationByMood(moodLabel, accessLevel || 'limited');
              finalMessage = messageData.text;

              // Mark as read only on production and if it's not a fallback message
              if (isProduction && messageData.id !== 'fallback') {
                  await markMotivationAsRead(messageData.collectionName, messageData.id);
              }
          }
      }
      
      // Log the mood after fetching and updating the message
      await logMood(moodLabel);

      setMotivation(finalMessage);
      setWarningLevel(newWarningLevel);

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
              variant={selectedMood === mood.label ? "outline" : "outline"}
              className={cn(
                "flex flex-col h-20 text-base hover:bg-muted hover:text-primary px-2 sm:px-10",
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
          <div className={cn("p-4 rounded-lg text-foreground border-l-4 max-w-2xl mx-auto animate-in fade-in-50 duration-500",
            {
                'bg-accent/10 border-accent': !warningLevel,
                'bg-orange-500/10 border-orange-500': warningLevel === 'orange',
                'bg-red-500/10 border-red-500': warningLevel === 'red',
            }
          )}>
            <div className="flex items-start">
              <Sparkles className={cn("h-5 w-5 mr-3 mt-1 flex-shrink-0",
               {
                'text-accent': !warningLevel,
                'text-orange-500': warningLevel === 'orange',
                'text-red-500': warningLevel === 'red',
               }
              )} />
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
