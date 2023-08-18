import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Dayjs } from "dayjs";

interface Location {
    name: string;
    code: string;
    // Otras propiedades según sea necesario
}

interface LostObjectData {
    country: Location;
    city: Location;
    airport: Location;
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


export default lostObjectSlice.reducer;
