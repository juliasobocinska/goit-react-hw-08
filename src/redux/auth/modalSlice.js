import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modaleDelete",
  initialState: {
    isModalOpen: false,
    contactId: null,
  },
  reducers: {
    openModal: (state, action) => {
      state.isModalOpen = true;
      state.contactId = action.payload;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.contactId = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
