import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import planSlice from "./features/plans/planSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    plan: planSlice,
  },
});
