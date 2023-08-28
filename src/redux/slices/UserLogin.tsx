import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";

interface UserLoginData {
  name: any;
  email: string;
  first: string;
  last: string;
  phone: string;
  password: string;
  login: any;
  picture: any;
}

interface UserLoginState {
  loggedInUser: UserLoginData | null;
}

const initialState: UserLoginState = {
  loggedInUser: null,
};

export const userLoginSlice = createSlice({
  name: "userLogin",
  initialState,
  reducers: {
    setUserLogin: (state, action: PayloadAction<UserLoginData>) => {
      state.loggedInUser = action.payload;
    },
    clearUserLogin: (state) => {
      state.loggedInUser = null;
    },
  },
});

export const { setUserLogin, clearUserLogin } = userLoginSlice.actions;

export const selectUserLogin = (state: RootState) => state.userLogin.loggedInUser;

export default userLoginSlice.reducer;
