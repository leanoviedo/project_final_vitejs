import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";
import {
  LostObjectData,
  LostObjectState,
  DataToReclaim,
} from "../../model/interface";

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
    markLostObjectAsClaimed: (state, action: PayloadAction<DataToReclaim>) => {
      const userReclamed = action.payload.userReclamed;
      const lostObjectId = action.payload.idLostObject;
      const lostObject = state.lostObjects.find(
        (obj) => obj.id === lostObjectId
      );
      if (lostObject) {
        lostObject.status = "reclamado";
        lostObject.userReclamed = userReclamed;
      }
    },
  },
});

export const { setLostObjectData, markLostObjectAsClaimed } =
  lostObjectSlice.actions;

export const selectLostObjects = (state: RootState) =>
  state.lostObject.lostObjects;

export default lostObjectSlice.reducer;
