import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "filters",
  initialState: {
    name: "",
  },
  reducers: {
    setNameFilter: (state, action) => {
      state.name = action.payload;
    },
  },
});

// Dodajemy selektor, aby uzyskać dostęp do wartości name w stanie
export const selectNameFilter = (state) => state.filters.name;

export const { setNameFilter } = slice.actions;
export default slice.reducer;
