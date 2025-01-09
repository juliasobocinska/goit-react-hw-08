import { createSlice } from "@reduxjs/toolkit";
import { logIn, logOut, register } from "./operations";

const handlePending = (state) => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    isRefreshUser: false,
    isLoggedIn: false,
    token: null,
    user: {
      name: null,
      email: null,
    },
    error: null,
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, handlePending)
      .addCase(register.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.loading = false;
      })
      .addCase(register.rejected, handleRejected)
      .addCase(logIn.pending, handlePending)
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.loading = false;
      })
      .addCase(logIn.rejected, handleRejected)
      .addCase(logOut.pending, handlePending)
      .addCase(logOut.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.loading = false;
        state.token = null;
        state.user = { name: null, email: null };
      })
      .addCase(logOut.rejected, handleRejected);
  },
});

export const AuthReducer = AuthSlice.reducer;
