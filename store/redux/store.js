import { configureStore } from "@reduxjs/toolkit";
import favouritesReducer from "./favouritesReducer";

export const store = configureStore({
  reducer: {
    favouriteMeals: favouritesReducer,
  },
});
