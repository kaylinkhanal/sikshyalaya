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
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import axios from "axios";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

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
  const [date, setDate] =useState(new Date());
  const [isDialogOpen ,setIsDialogOpen] = useState(false)
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventType, setEventType] = useState("");

  
  // Function to check if a date is an event day and get its event
  const getEvent = (day) =>
    events.find((event) =>{
    return  new Date(event.startDate).toDateString() === day.toDateString()
    });

  // Function to get the color for an event type
  const getEventColor = (type) =>
    legends.find((legend) => legend.eventType === type)?.color;


  const handleSelection = (date)=>{
    if(date-Date.now() >= 0) {
      setIsDialogOpen(true)
      setDate(date)
    }
  }

  const handleSubmit =async ()=> {
  const res =  await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/events`, {title: eventName,description:eventDescription,startDate:date,startTime:eventTime,eventType })
  }

  return (
    <div>
      <TooltipProvider>
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelection}
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
              const eventColor = getEventColor(event?.eventType);
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
         <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
   
          <DialogContent>
            <DialogTitle>Add New Event </DialogTitle>
            Date: {date.toDateString()}
            <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="event-name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="event-name"
                    placeholder="Enter event name"
                    className="col-span-3"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="event-description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="event-description"
                    placeholder="Enter event description"
                    className="col-span-3"
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="event-time" className="text-right">
                    Time
                  </Label>
                  <Input
                    id="event-time"
                    type="time"
                    className="col-span-3"
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="event-type" className="text-right">
                    Event Type
                  </Label>
                    <Select onValueChange={(val)=> setEventType(val)}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Event Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ECA">ECA</SelectItem>
                        <SelectItem value="Holiday">Holiday</SelectItem>
                        <SelectItem value="Exams">Exams</SelectItem>
                        <SelectItem value="Events">Events</SelectItem>
                      </SelectContent>
                    </Select>
                
                </div>
                <DialogFooter>
                  <Button type="submit">Save Event</Button>
                </DialogFooter>
              </form>
            
            
            </DialogContent>
        </Dialog>
      </TooltipProvider>
      <div className="mt-4 flex flex-wrap gap-4">
        {legends.map((legend) => (
          <div key={legend.eventType} className="flex items-center">
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



// 1. refresh the page and click on calendar
// 2. click on calendar 5 times
// 3. click on calendar once and click on another grid in the calendar