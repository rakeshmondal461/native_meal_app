import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ids: [],
};

export const favouriteSlice = createSlice({
  name: "favouriteMeals",
  initialState,
  reducers: {
    addFavourite: (state, action) => {
      state.ids.push(action.payload.id);
    },
    removeFavourite: (state, action) => {
      state.ids.splice(state.ids.indexOf(action.payload.id), 1);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addFavourite, removeFavourite } = favouriteSlice.actions;

export default favouriteSlice.reducer;
