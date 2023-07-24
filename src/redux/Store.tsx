import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./slices/UsersSlices.tsx";
import registrationReducer from "./slices/RegistrationSlices.tsx";
import userLoginReducer from "./slices/UserLogin.tsx"; // Corrected name

const store = configureStore({
  reducer: {
    usersList: usersReducer,
    registrationlist: registrationReducer,
    userLogin: userLoginReducer, // Corrected name
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
