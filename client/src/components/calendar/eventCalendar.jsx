"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// interface LegendConfig {
//   type: string
//   label: string
//   color: string
// }

// interface CalendarEvent {
//   id: string
//   date: Date
//   title: string
//   description: string
//   type: string
// }

// interface EventCalendarProps {
//   events: CalendarEvent[]
//   legends: LegendConfig[]
// }

// export function EventCalendar({ events, legends }: EventCalendarProps) {
export function EventCalendar({ events, legends }) {
  const [date, setDate] = React.useState(new Date());

  // Function to check if a date is an event day and get its event
  const getEvent = (day) =>
    events.find((event) => event.date.toDateString() === day.toDateString());

  // Function to get the color for an event type
  const getEventColor = (type) =>
    legends.find((legend) => legend.type === type)?.color;

  return (
    <div>
      <TooltipProvider>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border p-3  "
          classNames={{
            table: "w-full h-full border-collapse space-x-1 space-y-1",
            months: "w-full flex gap-2",
            month: "space-y-4 space-x-4",
            // table: "w-full border-collapse space-y-1",
            cell: "rounded-md text-center p-0 m-1  bg-slate-50",
            day: "h-14 w-14 p-0  relative ",
            head_cell: "text-muted-foreground font-normal text-xs ",
          }}
          // classNames={{
          //   months:
          //     "flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1",
          //   month: "space-y-4 w-full flex flex-col",
          //   table: "w-full h-full border-collapse space-y-1",
          //   head_row: "",
          //   row: "w-full mt-2",
          // }}
          components={{
            DayContent: (props) => {
              const event = props.date && getEvent(props.date);
              const eventColor = getEventColor(event?.type);
              const isToday =
                props.date?.toDateString() === new Date().toDateString();
              return (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className={cn(
                        "rounded-md relative flex flex-col items-start justify-center p-1 cursor-pointer h-14 w-14",
                        event && "font-medium",
                      )}
                      style={
                        eventColor
                          ? { backgroundColor: eventColor }
                          : isToday
                            ? { backgroundColor: "white" }
                            : undefined
                      }
                    >
                      <span className="text-sm">{props.date?.getDate()}</span>
                      {event && (
                        <span
                          className="text-xs truncate w-full text-center"
                          title={event.title}
                        >
                          {event.title.length > 10
                            ? `${event.title.slice(0, 10)}...`
                            : event.title}
                        </span>
                      )}
                    </div>
                  </TooltipTrigger>
                  {event && (
                    <TooltipContent
                      className="bg-primary text-primary-foreground p-2 rounded-md shadow-lg"
                      sideOffset={5}
                    >
                      <div className="text-sm">
                        <p className="font-bold mb-1">{event.title}</p>
                        <p>{event.description}</p>
                      </div>
                    </TooltipContent>
                  )}
                </Tooltip>
              );
            },
          }}
        />
      </TooltipProvider>
      <div className="mt-4 flex flex-wrap gap-4">
        {legends.map((legend) => (
          <div key={legend.type} className="flex items-center">
            <div
              className="h-4 w-4 mr-2 rounded"
              style={{ backgroundColor: legend.color }}
            ></div>
            <span>{legend.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
