"use client";
import SubjectForm from "@/components/add-subject";
import React, { useEffect, useState } from "react";
import ClassLayout from "../../../classLayout";
import BreadCrumbsItem from "@/components/dynamic-breadCrumbs";
import axios from "axios";
import { useParams } from "next/navigation";

const Section = () => {
	const params = useParams();
	const [sectionDetails, setSectionDetails] = useState(null); // Initial state set to null to check loading state.

	const fetchSectionDetails = async () => {
		try {
			const { data } = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/sections/${params.sectionId}`
			);
			setSectionDetails(data); // No need for data.json() since Axios automatically parses JSON.
		} catch (error) {
			console.error("Error fetching section details:", error);
		}
	};

	useEffect(() => {
		fetchSectionDetails();
	}, []);

	if (!sectionDetails) {
		return <p>Loading section details...</p>; // Render a loading state while fetching data.
	}

	return (
		<ClassLayout breadCrumbsItem={<BreadCrumbsItem depth={3} />}>
			<SubjectForm />
			<div>
				<h1 className="font-bold">Section Details</h1>
				<hr />
				<p>Section Name: {sectionDetails.sectionName}</p>
				<p>ClassId: {sectionDetails.class}</p>
				<p>Room Number: {sectionDetails.roomNumber}</p>

				<h2>Class Teacher</h2>
				{sectionDetails.classTeacher ? (
					<table className="w-full border-collapse border border-black">
						<thead className="bg-pink-400">
							<tr>
								<th className="text-left px-2">Full Name</th>
								<th className="text-left px-2">Email</th>
								<th className="text-left px-2">Phone Number</th>
								<th className="text-left px-2">Is Verified</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td className="px-2">{sectionDetails.classTeacher.fullName}</td>
								<td className="px-2">{sectionDetails.classTeacher.email}</td>
								<td className="px-2">
									{sectionDetails.classTeacher.phoneNumber}
								</td>
								<td className="px-2">
									{sectionDetails.classTeacher.isVerified ? "Yes" : "No"}
								</td>
							</tr>
						</tbody>
					</table>
				) : (
					<p>No class teacher assigned.</p>
				)}

				<h2>Subjects</h2>
				{sectionDetails.subjects && sectionDetails.subjects.length > 0 ? (
					<table className="w-full border-collapse border border-black">
						<thead className="bg-pink-400">
							<tr>
								<th className="text-left px-2">Subject Name</th>
								<th className="text-left px-2">Teacher ID</th>
							</tr>
						</thead>
						<tbody>
							{sectionDetails.subjects.map((subject) => (
								<tr key={subject._id}>
									<td className="px-2">{subject.subjectName}</td>
									<td className="px-2">{subject.teacher}</td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<p>No subjects available.</p>
				)}

				<h2>Students</h2>
				{sectionDetails.students && sectionDetails.students.length > 0 ? (
					<table className="w-full border-collapse border border-black">
						<thead className="bg-pink-400">
							<tr>
								<th className="text-left px-2">Full Name</th>
								<th className="text-left px-2">Email</th>
								<th className="text-left px-2">Phone Number</th>
								<th className="text-left px-2"> Is Verified</th>
								<th className="text-left px-2">Father Name</th>
								<th className="text-left px-2">Mother Name</th>
							</tr>
						</thead>
						<tbody>
							{sectionDetails.students.map((student) => (
								<tr key={student._id}>
									<td className="px-2">{student.fullName}</td>
									<td className="px-2">{student.email}</td>
									<td className="px-2">{student.phoneNumber || "N/A"}</td>
									<td className="px-2">{student.isVerified ? "Yes" : "No"}</td>
									<td className="px-2">{student.fatherName}</td>
									<td className="px-2">{student.motherName}</td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<p>No students enrolled.</p>
				)}
			</div>

			{/* {JSON.stringify(sectionDetails)} */}
		</ClassLayout>
	);
};

export default Section;
