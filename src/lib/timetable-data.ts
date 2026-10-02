export interface Period {
  time: string;
  subject: string;
  code: string;
  type?: 'LECTURE' | 'LAB';
  icon: string;
}

export const timetable: Record<string, Period[]> = {
  Monday: [
    { time: '09:10 AM - 10:05 AM', subject: 'MACHINE LEARNING TECHNIQUES', code: 'BCS055', type: 'LECTURE', icon: 'Cpu' },
    { time: '10:10 AM - 11:05 AM', subject: 'VERBAL ABILITY', code: 'SDC502', type: 'LECTURE', icon: 'Book' },
    { time: '11:10 AM - 12:05 PM', subject: 'QUANTITATIVE APPTITUDE', code: 'SDC501', type: 'LECTURE', icon: 'Book' },
    { time: '12:10 PM - 01:05 PM', subject: 'LOGICAL REASONING', code: 'SDC503', type: 'LECTURE', icon: 'Book' },
    { time: '01:05 PM - 02:00 PM', subject: 'LUNCH', code: 'LUNCH', icon: 'Utensils' },
    { time: '02:00 PM - 02:55 PM', subject: 'DATABASE DESIGN AND MANAGEMENT SYSTEM', code: 'BCS501', type: 'LECTURE', icon: 'Book' },
    { time: '03:00 PM - 03:55 PM', subject: 'ANALYSIS OF ALGORITHM', code: 'BCS503', type: 'LECTURE', icon: 'Network' },
    { time: '04:00 PM - 04:55 PM', subject: 'ESSENCE OF INDIAN TRADITIONAL KNOWLEDGE', code: 'BNC502', type: 'LECTURE', icon: 'Book' },
  ],
  Tuesday: [
    { time: '09:10 AM - 10:05 AM', subject: 'QUANTITATIVE APPTITUDE', code: 'SDC501', type: 'LECTURE', icon: 'Book' },
    { time: '10:10 AM - 11:05 AM', subject: 'ESSENCE OF INDIAN TRADITIONAL KNOWLEDGE', code: 'BNC502', type: 'LECTURE', icon: 'Book' },
    { time: '11:10 AM - 12:05 PM', subject: 'ENVIRONMENT AND ECOLOGY', code: 'BAS104', type: 'LECTURE', icon: 'Book' },
    { time: '12:10 PM - 01:05 PM', subject: 'WEB TECHNOLOGY', code: 'BCS502', type: 'LECTURE', icon: 'Book' },
    { time: '01:05 PM - 02:00 PM', subject: 'LUNCH', code: 'LUNCH', icon: 'Utensils' },
    { time: '02:00 PM - 02:55 PM', subject: 'DATABASE MANAGEMENT SYSTEM', code: 'BCS501', type: 'LECTURE', icon: 'Book' },
    { time: '03:00 PM - 03:55 PM', subject: 'DATABASE MANAGEMENT SYSTEM LAB', code: 'BCS551', type: 'LAB', icon: 'FlaskConical' },
    { time: '04:00 PM - 04:55 PM', subject: 'DATABASE MANAGEMENT SYSTEM LAB', code: 'BCS551', type: 'LAB', icon: 'FlaskConical' },
  ],
  Wednesday: [
    { time: '09:10 AM - 10:05 AM', subject: 'DESIGN AND ANALYSIS OF ALGORITHM', code: 'BCS503', type: 'LECTURE', icon: 'Network' },
    { time: '10:10 AM - 11:05 AM', subject: 'VERBAL ABILITY', code: 'SDC502', type: 'LECTURE', icon: 'Book' },
    { time: '11:10 AM - 12:05 PM', subject: 'DATA ANALYTICS', code: 'BCS052', type: 'LECTURE', icon: 'Book' },
    { time: '12:10 PM - 01:05 PM', subject: 'WEB TECHNOLOGY', code: 'BCS502', type: 'LECTURE', icon: 'Book' },
    { time: '01:05 PM - 02:00 PM', subject: 'LUNCH', code: 'LUNCH', icon: 'Utensils' },
    { time: '02:00 PM - 02:55 PM', subject: 'DATABASE MANAGEMENT SYSTEM', code: 'BCS501', type: 'LECTURE', icon: 'Book' },
    { time: '03:00 PM - 03:55 PM', subject: 'WEB TECHNOLOGY LAB', code: 'BCS552', type: 'LAB', icon: 'FlaskConical' },
    { time: '04:00 PM - 04:55 PM', subject: 'WEB TECHNOLOGY LAB', code: 'BCS552', type: 'LAB', icon: 'FlaskConical' },
  ],
  Thursday: [
    { time: '09:10 AM - 10:05 AM', subject: 'WEB TECHNOLOGY', code: 'BCS502', type: 'LECTURE', icon: 'Book' },
    { time: '10:10 AM - 11:05 AM', subject: 'MACHINE LEARNING TECHNIQUES', code: 'BCS055', type: 'LECTURE', icon: 'Cpu' },
    { time: '11:10 AM - 12:05 PM', subject: 'DATA ANALYTICS', code: 'BCS052', type: 'LECTURE', icon: 'Book' },
    { time: '12:10 PM - 01:05 PM', subject: 'DESIGN AND ANALYSIS OF ALGORITHM', code: 'BCS503', type: 'LECTURE', icon: 'Network' },
    { time: '01:05 PM - 02:00 PM', subject: 'LUNCH', code: 'LUNCH', icon: 'Utensils' },
    { time: '02:00 PM - 02:55 PM', subject: 'DATABASE DESIGN AND MANAGEMENT SYSTEM', code: 'BCS501', type: 'LECTURE', icon: 'Book' },
    { time: '03:00 PM - 03:55 PM', subject: 'DESIGN AND ANALYSIS OF ALGORITHM LAB', code: 'BCS553', type: 'LAB', icon: 'FlaskConical' },
    { time: '04:00 PM - 04:55 PM', subject: 'DESIGN AND ANALYSIS OF ALGORITHM LAB', code: 'BCS553', type: 'LAB', icon: 'FlaskConical' },
  ],
  Friday: [
    { time: '09:10 AM - 10:05 AM', subject: 'DATA ANALYTICS', code: 'BCS052', type: 'LECTURE', icon: 'Book' },
    { time: '10:10 AM - 11:05 AM', subject: 'MACHINE LEARNING TECHNIQUES', code: 'BCS055', type: 'LECTURE', icon: 'Cpu' },
    { time: '11:10 AM - 12:05 PM', subject: 'DESIGN AND ANALYSIS OF ALGORITHM', code: 'BCS503', type: 'LECTURE', icon: 'Network' },
    { time: '12:10 PM - 01:05 PM', subject: 'LOGICAL REASONING', code: 'SDC503', type: 'LECTURE', icon: 'Book' },
    { time: '01:05 PM - 02:00 PM', subject: 'LUNCH', code: 'LUNCH', icon: 'Utensils' },
    { time: '02:00 PM - 02:55 PM', subject: 'WEB TECHNOLOGY', code: 'BCS502', type: 'LECTURE', icon: 'Book' },
    { time: '03:00 PM - 03:55 PM', subject: 'MINI PROJECT OR INTERNSHIP ASSESMENT', code: 'BCS554', type: 'LECTURE', icon: 'FolderKanban' },
    { time: '04:00 PM - 04:55 PM', subject: 'ENVIRONMENT AND ECOLOGY', code: 'BAS104', type: 'LECTURE', icon: 'Book' },
  ],
};
