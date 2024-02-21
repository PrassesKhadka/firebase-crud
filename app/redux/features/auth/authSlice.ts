import { createSlice } from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector, type RootState } from "../../store";
import { IuserDocument } from "@/app/interfaces";

// Define a type for the slice state
interface authState {}

// Define the initial state using that type
const initialState: authState = {};

export const authSlice = createSlice({
  name: "auth",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
});

export const {} = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// You can access studentData like this as well instead of useAppSelector but you have to give the argument
// state type to RootState so to avoid that headache use useAppSelector instead
// export const studentData = (state: RootState) => state.auth.studentData;
// Here useAppSelector cannot be used because hooks can only be called inside of the bod of a functin component
// export const studentData = useAppSelector(
//   (state) => state.auth.studentData
// );

export default authSlice.reducer;
