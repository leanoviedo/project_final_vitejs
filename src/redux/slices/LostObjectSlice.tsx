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
      const { userReclamed, idLostObject } = action.payload;
      const lostObject = state.lostObjects.find(
        (obj) => obj.id === idLostObject
      );

      if (lostObject) {
        lostObject.status = "reclamado";
        lostObject.userReclamed = userReclamed;
      }
    },
    updateLostObjectStatus: (state, action: PayloadAction<DataToReclaim>) => {
      const { idLostObject, status } = action.payload;
      const lostObject = state.lostObjects.find(
        (obj) => obj.id === idLostObject
      );
      if (lostObject) {
        const validStatuses = ["enviado", "recibido", "finalizado"];

        if (validStatuses.includes(status)) {
          if (status === "recibido") {
            lostObject.status = "finalizado";
          } else {
            lostObject.status = status;
          }
        } else {
          console.error("Estado no válido");
        }
      }
    },
  },
});

export const {
  setLostObjectData,
  markLostObjectAsClaimed,
  updateLostObjectStatus,
} = lostObjectSlice.actions;

export const selectLostObjects = (state: RootState) =>
  state.lostObject.lostObjects;

export default lostObjectSlice.reducer;
