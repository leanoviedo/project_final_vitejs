import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";

interface lostObjectData {
    country: string;
    city: string;
    airport: string;
    photo?: string;
}

interface lostObjectState {
    lostObject: lostObjectData | string;
}

const initialState: lostObjectState = {
    lostObject: "",
};

export const lostObjectSlice = createSlice({
    name: "lostObject",
    initialState,
    reducers: {
        setlostObject: (state, action: PayloadAction<lostObjectData>) => {
            state.lostObject = action.payload;
        },
    },
});

export const { setlostObject } = lostObjectSlice.actions;

export const selectLostObject = (state: RootState) => state.userLogin;

export default lostObjectSlice.reducer;
