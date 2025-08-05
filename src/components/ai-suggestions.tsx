'use client';

import type { FC } from 'react';
import { useState } from 'react';
import { Lightbulb } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { type SuggestResourcesOutput } from '@/ai/flows/suggest-resources';
import { getSuggestions } from '@/app/actions/ai-suggestions';
import { LoadingAnimation } from '@/components/loading-animation';
import { ScrollArea } from './ui/scroll-area';

interface AiSuggestionsProps {
  subject: string;
}

export const AiSuggestions: FC<AiSuggestionsProps> = ({ subject }) => {
  const [suggestions, setSuggestions] = useState<SuggestResourcesOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleFetchSuggestions = async () => {
    if (suggestions) {
      setIsOpen(true);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const result = await getSuggestions(subject);
      setSuggestions(result);
    } catch (e) {
      setError('Failed to fetch suggestions. Please try again.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" onClick={handleFetchSuggestions} aria-label={`Get study tips for ${subject}`}>
          <Lightbulb className="h-5 w-5 text-yellow-500" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">AI Study Assistant</DialogTitle>
          <DialogDescription>
            Study resources and tips for {subject}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 min-h-[250px]">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <LoadingAnimation />
            </div>
          ) : error ? (
            <div className="text-destructive text-center">{error}</div>
          ) : suggestions ? (
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-6">
                <div>
                  <h3 className="font-headline text-lg font-semibold mb-2">Suggested Resources</h3>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    {suggestions.resources.map((resource, index) => (
                      <li key={`resource-${index}`}>{resource}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-headline text-lg font-semibold mb-2">Study Tips</h3>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    {suggestions.studyTips.map((tip, index) => (
                      <li key={`tip-${index}`}>{tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollArea>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
};
