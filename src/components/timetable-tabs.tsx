
'use client';

import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { timetable, type Period } from '@/lib/timetable-data';
import { ClassCard } from './class-card';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const days = Object.keys(timetable);

const useNotificationReminder = (periods: Period[], day: string) => {
  const { toast } = useToast();

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
      if (currentDay !== day) return;

      periods.forEach((period) => {
        if (!['LUNCH', 'Free Period', 'LIBRARY'].includes(period.subject)) {
          const [startTimeStr] = period.time.split(' - ');
          const [time, modifier] = startTimeStr.split(' ');
          let [hours, minutes] = time.split(':').map(Number);
          
          if (modifier === 'PM' && hours < 12) {
            hours += 12;
          }
          if (modifier === 'AM' && hours === 12) {
            hours = 0;
          }

          const classTime = new Date(now);
          classTime.setHours(hours, minutes, 0, 0);
          
          const timeDifference = classTime.getTime() - now.getTime();
          const fiveMinutes = 5 * 60 * 1000;
          
          // Check if the class is in the next 5 minutes, but not more than 5 minutes ago
          if (timeDifference > 0 && timeDifference <= fiveMinutes) {
            const notificationId = `notif-${day}-${period.code}-${period.time}`;
            if (!sessionStorage.getItem(notificationId)) {
              toast({
                title: 'Class Reminder',
                description: `${period.subject} is starting in 5 minutes.`,
              });
              sessionStorage.setItem(notificationId, 'true');
            }
          }
        }
      });
    };

    const interval = setInterval(checkTime, 60 * 1000); // Check every minute
    return () => clearInterval(interval);
  }, [periods, day, toast]);
};

export function TimetableTabs() {
  const [currentDay, setCurrentDay] = useState('');
  const [activeTab, setActiveTab] = useState('');
  const isMobile = useIsMobile();

  useEffect(() => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const dayExists = days.includes(today);
    const initialDay = dayExists ? today : days[0];
    setCurrentDay(initialDay);
    setActiveTab(initialDay);
  }, []);
  
  const activePeriods = timetable[activeTab] || [];
  useNotificationReminder(activePeriods, activeTab);

  if (!currentDay) {
    return null; // or a loading skeleton
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      {isMobile ? (
        <Select value={activeTab} onValueChange={setActiveTab}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Select a day" />
          </SelectTrigger>
          <SelectContent>
            {days.map((day) => (
              <SelectItem key={day} value={day}>
                {day}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <TabsList>
          {days.map((day) => (
            <TabsTrigger key={day} value={day}>
              {day}
            </TabsTrigger>
          ))}
        </TabsList>
      )}

      {days.map((day) => (
        <TabsContent key={day} value={day} className="mt-6">
          <div className="grid gap-4 md:gap-6">
            {timetable[day].map((period) => (
              <ClassCard key={`${day}-${period.time}`} period={period} day={day} />
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
