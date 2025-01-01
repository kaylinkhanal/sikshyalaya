"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { TotalCountCard } from "@/components/totalCount";
import { CircleChart } from "@/components/charts/circle";
import { StudentAttendance } from "@/components/charts/student-chart";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EventCalendar } from "@/components/calendar/eventCalendar";
import { Button } from "@/components/ui/button";

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

const Dashboard = () => {
	const router = useRouter();

	const [users, setUsers] = useState([]);
	const [eventList, setEventList] = useState([]);
	const [admins, setAdmins] = useState([]);
	const [teachers, setTeachers] = useState([]);
	const [students, setStudents] = useState([]);
	const [parents, setParents] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const usersResponse = await axios.get(
					`${process.env.NEXT_PUBLIC_API_URL}/users`
				);
				setUsers(usersResponse.data);

				const eventsResponse = await axios.get(
					`${process.env.NEXT_PUBLIC_API_URL}/events`
				);
				const eventsData = eventsResponse.data;

				const eventMap = {};
				eventsData.forEach((item) => {
					if (eventMap[item.startDate]) {
						eventMap[item.startDate] = {
							...item,
							description:
								item.description + "\n" + eventMap[item.startDate].description,
							title: item.title + "\n" + eventMap[item.startDate].title,
						};
					} else {
						eventMap[item.startDate] = item;
					}
				});

				setEventList(Object.values(eventMap));

				const admins = usersResponse.data.filter(
					(user) => user.role === "admin"
				);
				const teachers = usersResponse.data.filter(
					(user) => user.role === "teacher"
				);
				const students = usersResponse.data.filter(
					(user) => user.role === "student"
				);
				const parents = usersResponse.data.filter(
					(user) => user.role === "parent"
				);

				setAdmins(admins);
				setTeachers(teachers);
				setStudents(students);
				setParents(parents);
			} catch (error) {
				console.error("Failed to fetch data:", error);
			}
		};

		fetchData();
	}, []);

	const handleLogout = () => {
		// Clear tokens or perform logout logic here
		router.push("/login");

		// dispatch(logoutUser(data));
		toast({
			title: data.msg,
		});
	};

	return (
		<main className="xl:flex w-full gap-[18px]">
			<Button
				onClick={handleLogout}
				className="absolute top-4 right-4 bg-lamaPurple hover:bg-lamaPurple/90">
				Logout
			</Button>
			<section className="w-full">
				<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[30px]">
					<TotalCountCard
						className="bg-lamaPurple"
						role={"admin"}
						total={admins.length}
					/>
					<TotalCountCard
						className="bg-lamaYellow"
						role={"teacher"}
						total={teachers.length}
					/>
					<TotalCountCard
						className="bg-lamaPurple"
						role={"student"}
						total={students.length}
					/>
					<TotalCountCard
						className="bg-lamaYellow"
						role={"parent"}
						total={parents.length}
					/>
				</div>
				<section className="mt-[30px] flex gap-2">
					<CircleChart />
					<StudentAttendance />
				</section>
			</section>
			<section>
				<ScrollArea>
					<EventCalendar
						events={eventList}
						legends={[]}
					/>
					<strong className="text-2xl">Events</strong>
					<div className="flex flex-col gap-2">
						{eventList.map((event, id) => (
							<Card
								key={id}
								className="bg-white text-black rounded-md border p-2">
								<CardHeader className="flex flex-row justify-between">
									<CardTitle>{event.title}</CardTitle>
									<span className="opacity-50">{event.startDate}</span>
								</CardHeader>
								<CardContent>{event.description}</CardContent>
							</Card>
						))}
					</div>
				</ScrollArea>
			</section>
		</main>
	);
};

export default Dashboard;
