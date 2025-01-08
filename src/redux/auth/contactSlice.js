import { createSlice } from "@reduxjs/toolkit";
import { deleteContact, fetchContacts, addContact } from "./operations";

const hendlePending = (state) => {
  state.loading = true;
};

const hendleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const slice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, hendlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, hendleRejected)
      .addCase(addContact.pending, hendlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, hendleRejected)
      .addCase(deleteContact.pending, hendlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const index = state.items.findIndex(
          (contact) => contact.id === action.payload.id
        );
        state.items.splice(index, 1);
      })
      .addCase(deleteContact.rejected, hendleRejected);
  },
});

export const { fetchingInProgress, fetchingSuccess, fetchingError } =
  slice.actions;
export default slice.reducer;