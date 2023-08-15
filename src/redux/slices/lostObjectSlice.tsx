import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";

interface LostObjectData {
    country: string;
    city: string;
    airport: string;
    description: string;
    photo?: string;
}

interface LostObjectState {
    lostObject: LostObjectData | null; // Use null instead of String
}

const initialState: LostObjectState = {
    lostObject: null, // Use null initially
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

export const selectLostObject = (state: RootState) => state.lostObject.lostObject; // Access the lostObject field

export default lostObjectSlice.reducer;
