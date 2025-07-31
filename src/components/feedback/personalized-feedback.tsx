"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getPersonalizedFeedbackAction } from '@/lib/actions';
import { quizHistoryForFeedback } from '@/lib/data';
import { Loader2, Sparkles, Lightbulb } from 'lucide-react';

type Feedback = {
  feedback: string;
  suggestedTopics: string;
};

export default function PersonalizedFeedback() {
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateFeedback = async () => {
    setIsLoading(true);
    setFeedback(null);
    try {
      const result = await getPersonalizedFeedbackAction({
        quizHistory: quizHistoryForFeedback,
      });
      setFeedback(result);
    } catch (error) {
      console.error("Failed to get feedback:", error);
      setFeedback({
        feedback: 'Could not generate feedback at this time. Please try again later.',
        suggestedTopics: 'N/A'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance Analysis</CardTitle>
        <CardDescription>
          Click the button below to get AI-powered feedback based on your recent quiz history.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {isLoading && (
            <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="ml-4 text-muted-foreground">Analyzing your performance...</p>
            </div>
        )}
        {feedback && (
          <div className="space-y-6">
            <div className="p-4 border rounded-lg bg-background">
              <h3 className="font-semibold flex items-center mb-2">
                <Sparkles className="h-5 w-5 mr-2 text-primary" />
                AI Feedback
              </h3>
              <p className="text-muted-foreground">{feedback.feedback}</p>
            </div>
            <div className="p-4 border rounded-lg bg-background">
              <h3 className="font-semibold flex items-center mb-2">
                <Lightbulb className="h-5 w-5 mr-2 text-accent" />
                Suggested Topics to Review
              </h3>
              <p className="text-muted-foreground">{feedback.suggestedTopics}</p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleGenerateFeedback} disabled={isLoading} className="w-full sm:w-auto">
          {isLoading ? 'Generating...' : 'Generate My Feedback'}
        </Button>
      </CardFooter>
    </Card>
  );
}
