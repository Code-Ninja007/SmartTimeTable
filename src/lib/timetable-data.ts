export interface Period {
  time: string;
  subject: string;
  code: string;
  type?: 'LECTURE' | 'LAB';
  icon: string;
}

export const timetable: Record<string, Period[]> = {
  Monday: [
    { time: '09:10 AM - 10:05 AM', subject: 'DATA STRUCTURE LAB', code: 'CD23040', type: 'LAB', icon: 'FlaskConical' },
    { time: '10:10 AM - 11:05 AM', subject: 'DATA STRUCTURE LAB', code: 'CD23040', type: 'LAB', icon: 'FlaskConical' },
    { time: '11:10 AM - 12:05 PM', subject: 'COMPUTER ORGANIZATION & ARCHITECTURE', code: 'CS23200', type: 'LECTURE', icon: 'Cpu' },
    { time: '12:05 PM - 01:10 PM', subject: 'LUNCH', code: 'LUNCH', icon: 'Utensils' },
    { time: '01:10 PM - 01:55 PM', subject: 'Free Period', code: 'FREE', icon: 'Hourglass' },
    { time: '02:00 PM - 02:55 PM', subject: 'LIBRARY', code: 'LIBRARY', icon: 'Library' },
    { time: '03:00 PM - 03:55 PM', subject: 'DATA STRUCTURE', code: 'CS23010', type: 'LECTURE', icon: 'Network' },
    { time: '04:00 PM - 04:55 PM', subject: 'CORE JAVA', code: 'CS23030', type: 'LECTURE', icon: 'Coffee' },
  ],
  Tuesday: [
    { time: '09:10 AM - 10:05 AM', subject: 'DATA STRUCTURE LAB', code: 'CD23040', type: 'LAB', icon: 'FlaskConical' },
    { time: '10:10 AM - 11:05 AM', subject: 'DATA STRUCTURE LAB', code: 'CD23040', type: 'LAB', icon: 'FlaskConical' },
    { time: '11:10 AM - 12:05 PM', subject: 'COMPUTER ORGANIZATION & ARCHITECTURE', code: 'CS23200', type: 'LECTURE', icon: 'Cpu' },
    { time: '12:05 PM - 01:10 PM', subject: 'LUNCH', code: 'LUNCH', icon: 'Utensils' },
    { time: '01:10 PM - 01:55 PM', subject: 'Free Period', code: 'FREE', icon: 'Hourglass' },
    { time: '02:00 PM - 02:55 PM', subject: 'LIBRARY', code: 'LIBRARY', icon: 'Library' },
    { time: '03:00 PM - 03:55 PM', subject: 'DATA STRUCTURE', code: 'CS23010', type: 'LECTURE', icon: 'Network' },
    { time: '04:00 PM - 04:55 PM', subject: 'CORE JAVA', code: 'CS23030', type: 'LECTURE', icon: 'Coffee' },
  ],
  Wednesday: [
    { time: '09:10 AM - 10:05 AM', subject: 'CORE JAVA', code: 'CS23030', type: 'LECTURE', icon: 'Coffee' },
    { time: '10:10 AM - 11:05 AM', subject: 'DATA STRUCTURE', code: 'CS23010', type: 'LECTURE', icon: 'Network' },
    { time: '11:10 AM - 12:05 PM', subject: 'COMPUTER ORGANIZATION & ARCHITECTURE', code: 'CS23200', type: 'LECTURE', icon: 'Cpu' },
    { time: '12:05 PM - 01:10 PM', subject: 'LUNCH', code: 'LUNCH', icon: 'Utensils' },
    { time: '01:10 PM - 01:55 PM', subject: 'Free Period', code: 'FREE', icon: 'Hourglass' },
    { time: '02:00 PM - 02:55 PM', subject: 'LIBRARY', code: 'LIBRARY', icon: 'Library' },
    { time: '03:00 PM - 03:55 PM', subject: 'INDUSTRIAL TRAINING/INTERNSHIP', code: 'CS23600', type: 'LECTURE', icon: 'Briefcase' },
    { time: '04:00 PM - 04:55 PM', subject: 'PROJECT-1', code: 'CS23070', type: 'LECTURE', icon: 'FolderKanban' },
  ],
  Thursday: [
    { time: '09:10 AM - 10:05 AM', subject: 'CORE JAVA LAB', code: 'CS23050', type: 'LAB', icon: 'FlaskConical' },
    { time: '10:10 AM - 11:05 AM', subject: 'CORE JAVA LAB', code: 'CS23050', type: 'LAB', icon: 'FlaskConical' },
    { time: '11:10 AM - 12:05 PM', subject: 'DATA STRUCTURE', code: 'CS23010', type: 'LECTURE', icon: 'Network' },
    { time: '12:05 PM - 01:10 PM', subject: 'LUNCH', code: 'LUNCH', icon: 'Utensils' },
    { time: '01:10 PM - 01:55 PM', subject: 'Free Period', code: 'FREE', icon: 'Hourglass' },
    { time: '02:00 PM - 02:55 PM', subject: 'LIBRARY', code: 'LIBRARY', icon: 'Library' },
    { time: '03:00 PM - 03:55 PM', subject: 'CORE JAVA', code: 'CS23030', type: 'LECTURE', icon: 'Coffee' },
    { time: '04:00 PM - 04:55 PM', subject: 'COMPUTER ORGANIZATION & ARCHITECTURE', code: 'CS23200', type: 'LECTURE', icon: 'Cpu' },
  ],
  Friday: [
    { time: '09:10 AM - 10:05 AM', subject: 'CORE JAVA LAB', code: 'CS23050', type: 'LAB', icon: 'FlaskConical' },
    { time: '10:10 AM - 11:05 AM', subject: 'CORE JAVA LAB', code: 'CS23050', type: 'LAB', icon: 'FlaskConical' },
    { time: '11:10 AM - 12:05 PM', subject: 'PROJECT-1', code: 'CS23070', type: 'LECTURE', icon: 'FolderKanban' },
    { time: '12:05 PM - 01:10 PM', subject: 'LUNCH', code: 'LUNCH', icon: 'Utensils' },
    { time: '01:10 PM - 01:55 PM', subject: 'Free Period', code: 'FREE', icon: 'Hourglass' },
    { time: '02:00 PM - 02:55 PM', subject: 'LIBRARY', code: 'LIBRARY', icon: 'Library' },
    { time: '03:00 PM - 03:55 PM', subject: 'DATA STRUCTURE', code: 'CS23010', type: 'LECTURE', icon: 'Network' },
    { time: '04:00 PM - 04:55 PM', subject: 'COMPUTER ORGANIZATION & ARCHITECTURE', code: 'CS23200', type: 'LECTURE', icon: 'Cpu' },
  ],
};
