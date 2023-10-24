import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";
import { UserData, UsersState } from "../../model/interface";

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