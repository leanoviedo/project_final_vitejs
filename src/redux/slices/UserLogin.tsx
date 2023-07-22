import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";

interface UserLoginData {
  email: string;
  password: string;
}

interface UserLoginState {
  userLogin: UserLoginData[];
}

const initialState: UserLoginState = {
  userLogin: [],
};

export const userLoginSlice = createSlice({
  name: "userLogin",
  initialState,
  reducers: {
    setUserLogin: (state, action: PayloadAction<UserLoginData>) => {
      state.userLogin.push(action.payload);
    },
  },
});

export const { setUserLogin } = userLoginSlice.actions;

export const selectUserLogin = (state: RootState) => state.userLogin;

export default userLoginSlice.reducer;
