import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";

interface UserLoginData {
  email: string;
  password: string;
}

interface UserLoginState {
  userLogin: UserLoginData | null;
}

const initialState: UserLoginState = {
  userLogin: null,
};

export const userLoginSlice = createSlice({
  name: "userLogin",
  initialState,
  reducers: {
    setUserLogin: (state, action: PayloadAction<UserLoginData>) => {
      state.userLogin = action.payload;
    },
  },
});

export const { setUserLogin } = userLoginSlice.actions;

export const selectUserLogin = (state: RootState) => state.userLogin;

export default userLoginSlice.reducer;
