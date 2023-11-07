import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";
import { UserData, UserLoginState } from "../../model/interface";

const initialState: UserLoginState = {
  loggedInUser: null,
};

export const userLoginSlice = createSlice({
  name: "userLogin",
  initialState,
  reducers: {
    setUserLogin: (state, action: PayloadAction<UserData>) => {
      state.loggedInUser = action.payload;
    },
    clearUserLogin: (state) => {
      state.loggedInUser = null;
    },
  },
});

export const { setUserLogin, clearUserLogin } = userLoginSlice.actions;

export const selectUserLogin = (state: RootState) =>
  state.userLogin.loggedInUser;

export default userLoginSlice.reducer;
