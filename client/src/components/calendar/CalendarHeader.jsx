import React from 'react';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function CalendarHeader() {
  return (
    <div className="grid grid-cols-7 mb-2">
      {WEEKDAYS.map((day) => (
        <div
          key={day}
          className="text-center text-sm font-medium text-gray-600 py-2"
        >
          {day}
        </div>
      ))}
    </div>
  );
}