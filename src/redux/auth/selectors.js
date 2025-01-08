export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export const selectUser = (state) => state.auth.user;

export const selectRefreshUser = (state) => state.auth.isRefreshing;
