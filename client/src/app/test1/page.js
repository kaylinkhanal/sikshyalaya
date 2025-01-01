"use client";
import { useState } from "react";
import axios from "axios";

export default function Register() {
	const [formData, setFormData] = useState({
		fullName: "",
		email: "",
	});

	const [message, setMessage] = useState("");

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	// test
	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage("");

		// For now, we'll just log the data or show a message.
		// Replace with your API integration or database logic.
		console.log("Registration Data:", formData);
		setMessage(`Thank you for registering, ${formData.fullName}!`);
		setFormData({ fullName: "", email: "" }); // Clear the form

		try {
			const response = await axios.post(
				process.env.NEXT_PUBLIC_API_URL + "/test1",
				{
					fullName,
					email,
				}
			);

			if (response.status === 200 || response.status === 201) {
				setMessage("Subject added successfully!");
				setFormData("");
			} else {
				setMessage("Failed to add subject. Please try again.");
			}
		} catch (error) {
			console.error("Error adding subject:", error);
			setMessage("An error occurred. Please try again.");
		}
	};

	return (
		<div
			style={{
				maxWidth: "400px",
				margin: "50px auto",
				fontFamily: "Arial, sans-serif",
			}}>
			<h1>Registration Form</h1>
			<form
				onSubmit={handleSubmit}
				style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
				<div>
					<label htmlFor="fullName">Full Name</label>
					<input
						type="text"
						id="fullName"
						name="fullName"
						value={formData.fullName}
						onChange={handleChange}
						required
						style={{
							width: "100%",
							padding: "8px",
							marginTop: "5px",
							border: "1px solid #ccc",
							borderRadius: "4px",
						}}
					/>
				</div>
				<div>
					<label htmlFor="email">Email</label>
					<input
						type="email"
						id="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
						required
						style={{
							width: "100%",
							padding: "8px",
							marginTop: "5px",
							border: "1px solid #ccc",
							borderRadius: "4px",
						}}
					/>
				</div>
				<button
					type="submit"
					style={{
						backgroundColor: "#0070f3",
						color: "white",
						padding: "10px",
						border: "none",
						borderRadius: "4px",
						cursor: "pointer",
					}}>
					Register
				</button>
			</form>
			{message && (
				<p style={{ marginTop: "20px", color: "green" }}>{message}</p>
			)}
		</div>
	);
}
