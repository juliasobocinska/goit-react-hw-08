import { createSlice } from "@reduxjs/toolkit";
import { logIn, logOut, register } from "./operations";

const hendlePending = (state) => {
  state.loading = true;
};

const hendleRejected = (state, action) => {
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
      .addCase(register.pending, hendlePending)
      .addCase(register.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.token = action.payload.user;
        state.loading = false;
      })
      .addCase(register.rejected, hendleRejected)
      .addCase(logIn.pending, hendlePending)
      .addCase(logIn.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.loading = false;
      })
      .addCase(logIn.rejected, hendleRejected)
      .addCase(logOut.pending, hendlePending)
      .addCase(logOut.fulfilled, (state, action) => {
        state.isLoggedIn = false;
        state.loading = false;
        state.token = null;
        state.user = { name: null, email: null };
      })
      .addCase(logOut.rejected, hendleRejected);
  },
});

export const AuthReducer = AuthSlice.reducer;