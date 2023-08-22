



import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";

interface Location {
    name: string;
    code: string;
}

interface LostObjectData {
    country: Location;
    city: Location;
    airport: Location;
    date: string | null;
    description: string;
    photo?: string;
}

interface LostObjectState {
    lostObjects: LostObjectData[];
}

const initialState: LostObjectState = {
    lostObjects: [],
};

export const lostObjectSlice = createSlice({
    name: "lostObject",
    initialState,
    reducers: {
        setLostObjectData: (state, action: PayloadAction<LostObjectData>) => {
            state.lostObjects = [...state.lostObjects, action.payload];
        },
        clearLostObjects: (state) => {
            state.lostObjects = [];
        },
    },
});

export const { setLostObjectData, clearLostObjects } = lostObjectSlice.actions;

export const selectLostObjects = (state: RootState) =>
    state.lostObject.lostObjects;

export default lostObjectSlice.reducer;
