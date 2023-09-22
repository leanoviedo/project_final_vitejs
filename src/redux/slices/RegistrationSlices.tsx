import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";
import { UserData, RegistrationState } from "../../model/interface";

const initialState: RegistrationState = {
  registeredUser: [],
};

export const RegistrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserData>) => {
      state.registeredUser.push(action.payload);
    },
  },
});

export const { addUser } = RegistrationSlice.actions;

export const selectRegistrationData = (state: RootState) =>
  state.registration.registeredUser;

export default RegistrationSlice.reducer;
