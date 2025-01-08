import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "modaleDelete",
  initialState: {
    isOpenModale: false,
    contactId: null,
  },
  reducers: {
    openModale: (state, action) => {
      return {
        ...state,
        isOpenModale: true,
        contactId: action.payload,
      };
    },
    closedModale: (state) => {
      return {
        ...state,
        isOpenModale: false,
        contactId: null,
      };
    },
  },
});

export const { openModale, closedModale } = slice.actions;
export default slice.reducer;