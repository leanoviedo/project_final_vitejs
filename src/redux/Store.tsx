import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slices/UsersSlices.tsx";
import registrationReducer from "./slices/RegistrationSlices.tsx";
import userLoginReducer from "./slices/UserLogin.tsx";
import lostObjectReducer from "./slices/lostObjectSlice.tsx";
import chatReducer from "./slices/chatSlices.tsx";

const store = configureStore({
  reducer: {
    usersList: usersReducer,
    registration: registrationReducer,
    userLogin: userLoginReducer,
    lostObject: lostObjectReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
