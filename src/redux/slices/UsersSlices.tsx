import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";

interface UserData {
  picture: any;
  name: any;
  email: string;
  first: string;
  last: string;
  phone: string;
  password: string;
  login: any;
}

interface UsersState {
  users: UserData[];
}

const initialState: UsersState = {
  users: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<UserData[]>) => {
      state.users = action.payload;
    },
  },
});

export const { setUsers } = usersSlice.actions;

export const selectUsers = (state: RootState) => state.user;

export default usersSlice.reducer;
