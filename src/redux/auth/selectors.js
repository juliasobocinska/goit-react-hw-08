export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export const selectUser = (state) => state.auth.user;

export const selectRefreshUser = (state) => state.auth.isRefreshing;

//  selektory dla modala
export const selectContactId = (state) => state.modaleDelete.contactId;

export const selectIsModalOpen = (state) => state.modaleDelete.isModalOpen;
