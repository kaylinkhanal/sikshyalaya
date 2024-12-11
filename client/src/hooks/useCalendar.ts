import { useState, useCallback, useEffect } from 'react';
import { CalendarDay } from '../types/calendar';
import axios from 'axios';


export function useCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const [eventList, setEventList]= useState([])
  const fetchEvents =async () => {
    const {data} = await  axios.get('http://localhost:9000/events')
    setEventList(data)
  }
  useEffect(()=>{
    fetchEvents()
  },[])
  const getDaysInMonth = useCallback((year: number, month: number) => {
    const date = new Date(year, month, 1);
    const days: CalendarDay[] = [];
    
    // Get the first day of the month
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    // if (any of the event in the eventdate ===== dates)
    // Add days from previous month
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const day = new Date(year, month, -i);
      days.push({ 
        date: day,
        events: eventList
      });
    }
    
    // Add days of current month
    while (date.getMonth() === month) {
      days.push({ 
        date: new Date(date),
        events:eventList
      });
      date.setDate(date.getDate() + 1);
    }
    
    // Add days from next month
    const remainingDays = 42 - days.length; // 6 rows * 7 days = 42
    for (let i = 1; i <= remainingDays; i++) {
      const day = new Date(year, month + 1, i);
      days.push({ 
        date: day,
        events: eventList
      });
    }
    
    return days;
  }, []);

  const days = getDaysInMonth(currentYear, currentMonth);

  const nextMonth = useCallback(() => {
    setCurrentDate(new Date(currentYear, currentMonth + 1));
  }, [currentMonth, currentYear]);

  const prevMonth = useCallback(() => {
    setCurrentDate(new Date(currentYear, currentMonth - 1));
  }, [currentMonth, currentYear]);

  return {
    currentDate,
    currentMonth,
    currentYear,
    days,
    nextMonth,
    prevMonth,
  };
}