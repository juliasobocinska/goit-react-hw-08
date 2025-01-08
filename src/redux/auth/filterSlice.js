import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "filters",
  initialState: {
    name: "",
  },
  reducers: {
    filtersContact: (state, action) => {
      return {
        ...state,
        name: action.payload,
      };
    },
  },
});

export const { filtersContact } = slice.actions;
export default slice.reducer;