import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: null,
    token: null,
    email: null,
    role: null,
    isLoggedIn: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      setCredentials: (state, action) => {
        const { user, token, email, role } = action.payload;
        state.user = user || null;
        state.token = token || null;
        state.email = email || user?.email || null;
        state.role = role ?? user?.role ?? null;  // 🔹 yahan se role set
        state.isLoggedIn = !!token;
      },
      logout: (state) => {
        state.user = null;
        state.token = null;
        state.email = null;
        state.role = null;
        state.isLoggedIn = false;
      },
    },
  });
  
  export const { setCredentials, logout } = authSlice.actions;
  
  export default authSlice.reducer;