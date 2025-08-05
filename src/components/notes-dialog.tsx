
'use client';

import type { FC } from 'react';
import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { NotebookPen } from 'lucide-react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { useUserId } from '@/hooks/use-user-id';

interface NotesDialogProps {
  subject: string;
  day: string;
  code: string;
}

export const NotesDialog: FC<NotesDialogProps> = ({ subject, day, code }) => {
  const userId = useUserId();
  const noteKey = `classsync-notes-${userId}-${day}-${code}`;
  const [notes, setNotes] = useLocalStorage(noteKey, '');
  const [tempNotes, setTempNotes] = React.useState(notes);

  const handleSave = () => {
    setNotes(tempNotes);
  };

  React.useEffect(() => {
    setTempNotes(notes);
  }, [notes]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={`View notes for ${subject}`}>
          <NotebookPen className="h-5 w-5 text-accent" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">Notes & Reminders</DialogTitle>
          <DialogDescription>
            {subject} - {day}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Textarea
            placeholder="Add your notes, homework reminders, or deadlines here..."
            className="min-h-[250px]"
            value={tempNotes}
            onChange={(e) => setTempNotes(e.target.value)}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" onClick={handleSave}>
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
