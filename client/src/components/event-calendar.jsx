"use client";
import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"

export function EventCalendar({
  eventDays
}) {
  const [date, setDate] = React.useState(new Date())

  // Function to check if a date is an event day
  const isEventDay = (day) => 
    eventDays.some(eventDay => 
      eventDay.toDateString() === day.toDateString())

  return (
    (<Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
      modifiers={{
        event: (date) => isEventDay(date),
      }}
      modifiersClassNames={{
        event: "relative",
      }}
      components={{
        DayContent: (props) => (
          <div
            className={cn(
              props.className,
              "relative flex h-8 w-8 items-center justify-center p-0",
              props.date && isEventDay(props.date) && "after:absolute after:bottom-1 after:left-1/2 after:h-1 after:w-1 after:-translate-x-1/2 after:rounded-full after:bg-blue-500"
            )}>
            {props.date?.getDate()}
          </div>
        ),
      }} />)
  );
}

