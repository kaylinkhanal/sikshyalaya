"use client";
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
	token: "",
	userDetails: {},
	isLoggednIn: false,
};
export const userSlice = createSlice({
	name: "card",
	initialState,
	reducers: {
		loginUser: (state, action) => {
			const { token, user: userDetails, isLoggednIn } = action.payload;
			return {
				...state,
				token,
				userDetails,
				isLoggednIn,
			};
		},
		logoutUser: (state) => {
			return initialState;
		},
	},
});

export const { loginUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
