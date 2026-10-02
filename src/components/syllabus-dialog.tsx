'use client';

import type { FC } from 'react';
import { BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { syllabusByCode } from '@/lib/syllabus-data';

interface SyllabusDialogProps {
  subject: string;
  code: string;
}

export const SyllabusDialog: FC<SyllabusDialogProps> = ({ subject, code }) => {
  const syllabus = syllabusByCode[code];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={`View syllabus for ${subject}`}
          title="View syllabus"
        >
          <BookOpen className="h-4 w-4 text-primary" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle className="font-headline text-xl">
            {syllabus?.title ?? subject}
          </DialogTitle>
          <DialogDescription>
            {code} · {syllabus?.sections ? 'Practical syllabus' : 'Unit-wise syllabus'}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[65vh] pr-4">
          <div className="space-y-4 pb-2">
            {syllabus && (
              <>
                {syllabus.units?.map((unit) => (
                  <section
                    key={unit.title}
                    className="rounded-lg border bg-card p-4"
                  >
                    <h3 className="mb-3 font-semibold">{unit.title}</h3>
                    <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
                      {unit.topics.map((topic) => (
                        <li key={topic}>{topic}</li>
                      ))}
                    </ul>
                  </section>
                ))}
                {syllabus.sections?.map((section) => (
                  <section
                    key={section.title}
                    className="rounded-lg border bg-card p-4"
                  >
                    <h3 className="mb-3 font-semibold">{section.title}</h3>
                    <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
                      {section.topics.map((topic) => (
                        <li key={topic}>{topic}</li>
                      ))}
                    </ul>
                  </section>
                ))}
              </>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
