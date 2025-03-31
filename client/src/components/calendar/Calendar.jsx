import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCalendar } from '../../hooks/useCalendar';
import { getDayColor } from '../../utils/calendarUtils';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';

export default function Calendar() {
  const {
    currentDate,
    currentMonth,
    currentYear,
    days,
    nextMonth,
    prevMonth,
  } = useCalendar();

  return (
    <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={prevMonth}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
      
      <CalendarHeader />
      <CalendarGrid 
        days={days}
        currentDate={currentDate}
        currentMonth={currentMonth}
        currentYear={currentYear}
        getDayColor={getDayColor}
      />
         

      <div className="mt-4 pt-4 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Event Types:</h3>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-red-100"></div>
            <span className="text-xs text-gray-600">Exams</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-yellow-100"></div>
            <span className="text-xs text-gray-600">Holiday</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-blue-100"></div>
            <span className="text-xs text-gray-600">ECA</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-green-100"></div>
            <span className="text-xs text-gray-600">Events</span>
          </div>
        </div>
      </div>
    </div>
  );
}