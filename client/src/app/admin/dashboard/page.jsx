"use client";
import { CircleChart } from "@/components/charts/circle";
import { TotalCountCard } from "@/components/totalCount";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import React, { useState, useEffect, use } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [date, setDate] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/users`
        );
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const fetchEvent = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/events`
      );
      console.log("Fetched events:", data);
      setEvents(data);
    } catch (error) {
      console.error("Error fetching event:", error);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [events]);

  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate);
    setIsDialogOpen(true);
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    if (!date) return;

    const newEvent = {
      title: eventName,
      description: eventDescription,
      time: eventTime,
      date: date.toISOString().split("T")[0],
    };
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/events`,
        newEvent
      );
      alert("Event added successfully!");
    } catch (error) {
      console.error("Error adding event:", error);
    } finally {
      setEventName("");
      setEventDescription("");
      setEventTime("");
      setIsDialogOpen(false);
    }
  };

  return (
    <main className="flex">
      <section className="w-[80%]">
        <div className="grid grid-cols-2 gap-2 md:flex ">
          <TotalCountCard
            className="bg-lamaPurple"
            role={"admin"}
            total={users.filter((user) => user.role === "admin").length}
          />
          <TotalCountCard
            className="bg-lamaYellow"
            role={"teacher"}
            total={users.filter((user) => user.role === "teacher").length}
          />
          <TotalCountCard
            className="bg-lamaYellow"
            role={"student"}
            total={users.filter((user) => user.role === "student").length}
          />
          <TotalCountCard
            className="bg-lamaYellow"
            role={"parent"}
            total={users.filter((user) => user.role === "parent").length}
          />
        </div>
        <CircleChart />
      </section>
      <section>
        <ScrollArea>
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            className="rounded-md border"
          />
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Event</DialogTitle>
                <DialogDescription>
                  Add details for the event scheduled on{" "}
                  {date && date.toLocaleDateString()}.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddEvent} className="grid gap-4 py-4">
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
                <DialogFooter>
                  <Button type="submit">Save Event</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <section>
            <strong className="text-2xl">Events</strong>
            <div className="flex flex-col gap-2">
              {Array.isArray(events) && events.length > 0 ? (
                events.map((event, id) => (
                  <Card
                    key={id}
                    className="bg-white text-black rounded-md border border-t-4 border-lamaPurple p-2"
                  >
                    <CardHeader className="flex flex-row items-center justify-between p-0">
                      <CardTitle className="p-0">{event.title}</CardTitle>
                      <span className="opacity-50 text-sm">{event.time}</span>
                    </CardHeader>
                    <CardContent className="p-0">
                      {event.description}
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p>No events available</p>
              )}
            </div>
          </section>
        </ScrollArea>
      </section>
    </main>
  );
};

export default Dashboard;
