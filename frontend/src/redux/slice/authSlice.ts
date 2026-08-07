// import api from "../../api/api";

import { createSlice } from "@reduxjs/toolkit";
import {
  currentUser,
  login,
  logout,
  register,
} from "./operations/authOperations";
import { tokenHeader } from "../../api/api";

interface User {
  user_id: string;
  created_at?: string;
  name: string;
  email: string;
  password?: string;
}

interface AuthState {
  user: User;
  token: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: {
    user_id: "",
    created_at: "",
    name: "",
    email: "",
    password: "",
  },
  token: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        tokenHeader.set(action.payload.token);
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Registration failed";
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        tokenHeader.set(action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Sing in failed";
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = initialState.user;
        state.token = null;
        state.isLoggedIn = false;
        tokenHeader.unset();
      })
      .addCase(currentUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(currentUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(currentUser.rejected, (state) => {
        state.isLoggedIn = false;
        state.token = null;
      });
  },
});

export const { setToken, setIsLoggedIn } = authSlice.actions;

export default authSlice.reducer;
