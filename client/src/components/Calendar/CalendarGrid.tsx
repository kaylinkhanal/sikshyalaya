import React from 'react';
import { CalendarDay } from '../../types/calendar';

interface CalendarGridProps {
  days: CalendarDay[];
  currentDate: Date;
  currentMonth: number;
  currentYear: number;
  getDayColor: (date: Date, events: CalendarDay['events']) => string;
}

export default function CalendarGrid({
  days,
  currentDate,
  currentMonth,
  currentYear,
  getDayColor,
}: CalendarGridProps) {
  return (
    <div className="grid grid-cols-7 gap-1">
      {days.map((day, index) => {
        const isToday = day.date.toDateString() === new Date().toDateString();
        const isCurrentMonth = day.date.getMonth() === currentMonth;
        const hasEvents = day.events && day.events.length > 0;
        
        return (
          <div
            key={index}
            className={`
              aspect-square p-2 relative rounded-lg transition-all
              ${isCurrentMonth ? 'bg-opacity-100' : 'bg-opacity-40'}
              ${getDayColor(day.date, day.events)}
              hover:scale-105 cursor-pointer group
            `}
          >
            <span className={`
              text-sm font-medium
              ${isToday ? 'bg-blue-500 text-white rounded-full px-2 py-1' : ''}
              ${isCurrentMonth ? 'text-gray-800' : 'text-gray-400'}
            `}>
              {day.date.getDate()}
            </span>
            
            {hasEvents && (
              <div className="absolute bottom-1 left-1 right-1">
                <div className="text-xs font-medium truncate text-gray-600">
                  {day.events[0].title}
                </div>
              </div>
            )}
            
            {hasEvents && (
              <div className="absolute hidden group-hover:block z-10 bg-white p-2 rounded-lg shadow-lg -translate-y-full left-0 min-w-[200px] top-0">
                {day.events.map((event) => (
                  <div key={event.id} className="mb-2 last:mb-0">
                    <div className="font-medium text-sm">{event.title}</div>
                    <div className="text-xs text-gray-600">{event.description}</div>
                    <div className="text-xs mt-1">
                      <span className={`
                        px-2 py-0.5 rounded-full
                        ${event.type === 'exam' ? 'bg-red-100 text-red-800' : ''}
                        ${event.type === 'assignment' ? 'bg-yellow-100 text-yellow-800' : ''}
                        ${event.type === 'lecture' ? 'bg-blue-100 text-blue-800' : ''}
                        ${event.type === 'workshop' ? 'bg-green-100 text-green-800' : ''}
                      `}>
                        {event.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}