import { EventCalendar } from "@/components/event-calendar"

export default function Home() {
  // Example event days (you can replace these with your actual event days)
  const eventDays = [
    new Date(2024, 11, 1),  // January 1, 2024
    new Date(2024, 11, 15), // January 15, 2024
    new Date(2024, 1, 14), // February 14, 2024
    new Date(2024, 2, 17), // March 17, 2024
  ]

  return (
    (<div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="mb-8 text-2xl font-bold">Event Calendar</h1>
      <EventCalendar eventDays={eventDays} />
    </div>)
  );
}

