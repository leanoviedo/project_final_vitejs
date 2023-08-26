import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";

interface UserData {
  email: string;
  first: string;
  last: string;
  phone: string;
  password: string;
  login: any
}

interface RegistrationState {
  registeredUser: UserData[];
}

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
