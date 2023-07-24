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
  usersAvailable: UserData[];
}

const initialState: UsersState = {
  usersAvailable: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<UserData[]>) => {
      state.usersAvailable = action.payload;
    },
  },
});

export const { setUsers } = usersSlice.actions;

export const selectUsers = (state: RootState) => state.usersList;

export default usersSlice.reducer;
