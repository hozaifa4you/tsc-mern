import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import authenticationSlice from "./reducer/authenticationSlice";
import projectsSlice from "./reducer/projectsSlice";
// import counterReducer from "../features/counter";

export const store = configureStore({
   reducer: {
      authentication: authenticationSlice,
      projects: projectsSlice,
   },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
   ReturnType,
   RootState,
   unknown,
   Action<string>
>;
