import { createSlice, createAction, PayloadAction, Dispatch } from '@reduxjs/toolkit';


interface UserState {
	accessToken?: string;
	data?: any;
}

const initialState: UserState = {
	accessToken: undefined,
	data: undefined,
};


export const userReducer = (state: UserState = initialState, action: any) => {

	if (action.type === "AAD_LOGIN_SUCCESS") {
		console.log("AAD_LOGIN_SUCCESS", "AAA")
		return action.payload;
	}

	return state;
}
