// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // The authenticated user or null if not authenticated
  isAuthenticated: false, // A flag indicating whether the user is authenticated
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to set the authenticated user
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },

    // Action to clear the authenticated user (logout)
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },

    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

// Export action creators
export const { setUser, clearUser, updateUser } = authSlice.actions;

// Export the auth reducer
export default authSlice.reducer;
