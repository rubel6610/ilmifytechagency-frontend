// redux/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isEmailVerified: boolean;
}

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
}

const initialState: AuthState = {
  token: null,
  refreshToken: null,
  user: null,
}; 

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        token: string;
        refreshToken: string;
        user: User;
      }>
    ) => {
      const { token, refreshToken, user } = action.payload;

      state.token = token;
      state.refreshToken = refreshToken;
      state.user = user;

      // Save access token to cookie (for SSR or page reloads)
      Cookies.set("accessToken", token, { expires: 7 }); // 7 days
    },
    logout: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.user = null;

      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      
      // Optional: clear other auth cookies if used
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;