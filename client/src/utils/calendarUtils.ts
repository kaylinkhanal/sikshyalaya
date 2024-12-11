import { CalendarDay, CalendarEvent, SCHOOL_EVENTS } from '../types/calendar';

export const getDayColor = (date: Date, events: CalendarEvent[]): string => {
  if (events.length > 0) {
    switch (events[0].type) {
      case 'exam':
        return 'bg-red-100';
      case 'assignment':
        return 'bg-yellow-100';
      case 'lecture':
        return 'bg-blue-100';
      case 'workshop':
        return 'bg-green-100';
    }
  }

  const day = date.getDay();
  const dateNum = date.getDate();

  // Weekends
  if (day === 0 || day === 6) {
    return 'bg-orange-100';
  }

  // First day of month
  if (dateNum === 1) {
    return 'bg-green-100';
  }

  // Last day of month
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  if (dateNum === lastDay) {
    return 'bg-purple-100';
  }

  // Default
  return 'bg-gray-50';
};