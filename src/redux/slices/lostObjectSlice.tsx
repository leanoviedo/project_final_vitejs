import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";
import { Dayjs } from "dayjs";

interface LostObjectData {
    country: string;
    city: string;
    airport: string;
    date: Dayjs | null;
    description: string;
    photo?: string;
}

interface LostObjectState {
    lostObject: LostObjectData | null;
}

const initialState: LostObjectState = {
    lostObject: null,
};

export const lostObjectSlice = createSlice({
    name: "lostObject",
    initialState,
    reducers: {
        setLostObjectData: (state, action: PayloadAction<LostObjectData>) => {
            state.lostObject = action.payload;
        },
    },
});

export const { setLostObjectData } = lostObjectSlice.actions;

export const selectLostObject = (state: RootState) => state.lostObject.lostObject;

export default lostObjectSlice.reducer;
