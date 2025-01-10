import { createSlice } from "@reduxjs/toolkit";
import {
  deleteContact,
  fetchContacts,
  addContact,
  addDefaultContacts,
  updateContact,
} from "./operations";

// Funkcja do obsługi stanu "loading"
const handlePending = (state) => {
  state.loading = true;
};

// Funkcja do obsługi błędów
const handleRejected = (state, action) => {
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
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)

      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.items.push(action.payload); 
      })
      .addCase(addContact.rejected, handleRejected)

      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const index = state.items.findIndex(
          (contact) => contact.id === action.payload.id
        );
        if (index !== -1) {
          state.items.splice(index, 1); 
        }
      })
      .addCase(deleteContact.rejected, handleRejected)

      // Obsługa dodawania domyślnych kontaktów
      .addCase(addDefaultContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // Dodanie domyślnych kontaktów, unikając duplikatów
        state.items = [...state.items, ...action.payload].filter(
          (value, index, self) =>
            // Filtrujemy duplikaty
            index === self.findIndex((t) => t.id === value.id) 
        );
      })

      // Obsługa akcji edytowania kontaktu
      .addCase(updateContact.pending, handlePending) 
      .addCase(updateContact.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const index = state.items.findIndex(
          (contact) => contact.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload; 
        }
      })
      .addCase(updateContact.rejected, handleRejected);
  },
});

export const { fetchingInProgress, fetchingSuccess, fetchingError } = slice.actions;
export default slice.reducer;
