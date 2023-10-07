import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";
import { LostObjectData, LostObjectState } from "../../model/Interface";

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

    },
});

export const { setLostObjectData } = lostObjectSlice.actions;

export const selectLostObjects = (state: RootState) =>
    state.lostObject.lostObjects;

export default lostObjectSlice.reducer;
