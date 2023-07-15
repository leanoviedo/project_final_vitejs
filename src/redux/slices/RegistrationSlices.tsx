import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";

interface UserData {
  email: string;
  first: string;
  last: string;
  phone: string;
  password: string;
}

interface RegistrationState {
  registrationData: UserData[];
}

const initialState: RegistrationState = {
  registrationData: [],
};

export const RegistrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserData>) => {
      state.registrationData.push(action.payload);
    },
  },
});

export const { addUser } = RegistrationSlice.actions;

export const selectRegistrationData = (state: RootState) =>
  state.registration.registrationData;

export default RegistrationSlice.reducer;