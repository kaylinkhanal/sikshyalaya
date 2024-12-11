export interface CalendarDay {
  date: Date;
  events?: CalendarEvent[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  type: 'exam' | 'assignment' | 'lecture' | 'workshop';
  description?: string;
}

export const SCHOOL_EVENTS: CalendarEvent[] = [
  {
    id: '1',
    title: 'Math Final Exam',
    type: 'exam',
    description: 'Calculus II Final Examination'
  },
  {
    id: '2',
    title: 'Physics Lab',
    type: 'lecture',
    description: 'Electromagnetic Fields Lab'
  },
  {
    id: '3',
    title: 'Programming Assignment Due',
    type: 'assignment',
    description: 'Data Structures Project'
  },
  {
    id: '4',
    title: 'Chemistry Workshop',
    type: 'workshop',
    description: 'Organic Chemistry Lab Preparation'
  },
  {
    id: '5',
    title: 'Literature Essay Due',
    type: 'assignment',
    description: 'Modern American Literature Analysis'
  }
];