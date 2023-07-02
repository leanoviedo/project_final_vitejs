import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slices/UsersSlices";
import registrationReducer from "./slices/RegistrationSlices";

const store = configureStore({
  reducer: {
    user: usersReducer,
    registration: registrationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
