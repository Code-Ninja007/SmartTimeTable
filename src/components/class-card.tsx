
'use client';

import type { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Period } from '@/lib/timetable-data';
import * as Lucide from 'lucide-react';
import { NotesDialog } from './notes-dialog';
import { AiSuggestions } from './ai-suggestions';
import { cn } from '@/lib/utils';
import { useCurrentTime } from '@/hooks/use-current-time';

interface ClassCardProps {
  period: Period;
  day: string;
}

const ICONS: { [key: string]: React.ElementType } = {
  Network: Lucide.Network,
  Cpu: Lucide.Cpu,
  Coffee: Lucide.Coffee,
  Briefcase: Lucide.Briefcase,
  FolderKanban: Lucide.FolderKanban,
  FlaskConical: Lucide.FlaskConical,
  Library: Lucide.Library,
  Utensils: Lucide.Utensils,
  Hourglass: Lucide.Hourglass,
  Book: Lucide.Book,
};

export const ClassCard: FC<ClassCardProps> = ({ period, day }) => {
  const isInteractive = !['LUNCH', 'Free Period', 'LIBRARY'].includes(period.subject);
  const IconComponent = ICONS[period.icon] || Lucide.Book;
  const now = useCurrentTime();

  const getRemainingTime = () => {
    const today = new Date();
    const currentDay = today.toLocaleDateString('en-US', { weekday: 'long' });
    if (currentDay !== day) return null;

    if (period.time) {
      const [startTimeStr, endTimeStr] = period.time.split(' - ');

      const parseTime = (timeStr: string) => {
        const [time, modifier] = timeStr.split(' ');
        let [hours, minutes] = time.split(':').map(Number);
        if (modifier === 'PM' && hours < 12) {
          hours += 12;
        }
        if (modifier === 'AM' && hours === 12) {
          hours = 0;
        }
        const date = new Date();
        date.setHours(hours, minutes, 0, 0);
        return date;
      };

      const classStartTime = parseTime(startTimeStr);
      const classEndTime = parseTime(endTimeStr);

      if (now >= classStartTime && now < classEndTime) {
        const remainingMillis = classEndTime.getTime() - now.getTime();
        const remainingMinutes = Math.floor(remainingMillis / (1000 * 60));
        const remainingSeconds = Math.floor((remainingMillis % (1000 * 60)) / 1000);
        return `${remainingMinutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')} left`;
      }
    }
    return null;
  };
  
  const remainingTime = getRemainingTime();

  return (
    <Card className={cn("w-full transition-all duration-300", !isInteractive && "bg-muted/50", !!remainingTime && "ring-2 ring-primary")}>
      <CardHeader className="p-4">
        <div className="flex justify-between items-start gap-4">
          <div className="flex items-center gap-3">
            <IconComponent className="h-7 w-7 md:h-8 md:w-8 text-primary" />
            <div>
              <CardTitle className="font-headline text-lg md:text-xl">{period.subject}</CardTitle>
              <CardDescription className="text-xs md:text-sm">{period.time}</CardDescription>
            </div>
          </div>
          <div className="flex items-center -mt-1 -mr-1 shrink-0">
            {remainingTime && (
              <div className="text-xs md:text-sm font-medium text-primary mr-1 bg-primary/10 px-2 py-1 rounded-md">
                {remainingTime}
              </div>
            )}
            {isInteractive && (
              <>
                <NotesDialog subject={period.subject} day={day} code={period.code} />
                <AiSuggestions subject={period.subject} />
              </>
            )}
          </div>
        </div>
      </CardHeader>
      {period.code && (
        <CardContent className="px-4 pb-4 pt-0">
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>
              {period.type ? `${period.type} ` : ''}({period.code})
            </span>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
