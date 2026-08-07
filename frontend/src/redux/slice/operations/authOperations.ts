import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, tokenHeader } from "../../../api/api";
import axios from "axios";

interface userResponsReg {
  user_id: string;
  name: string;
  email: string;
}

export interface RegiterUser {
  name: string;
  email: string;
  password: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

interface authResponse {
  user: userResponsReg;
  token: string;
}

export const register = createAsyncThunk<
  authResponse,
  RegiterUser,
  { rejectValue: string }
>("user/register", async (credential, thunkAPI) => {
  try {
    const res = await api.post("users/register", credential);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(error.response?.data.message);
    }

    return thunkAPI.rejectWithValue("Unknown error");
  }
});

export const login = createAsyncThunk<
  authResponse,
  LoginUser,
  { rejectValue: string }
>("user/login", async (credential, thunkAPI) => {
  try {
    const res = await api.post("users/login", credential);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(error.response?.data.message);
    }

    return thunkAPI.rejectWithValue("Unknown error");
  }
});

export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  "user/logout",
  async () => {
    tokenHeader.unset();
  },
);

export const currentUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as { auth: { token?: string | null } };

    const tokenPersistor = state.auth?.token;

    if (!tokenPersistor) {
      return thunkAPI.rejectWithValue("No token available");
    }
    tokenHeader.set(tokenPersistor);
    try {
      const { data } = await api.get("/users/current");

      return data;
    } catch (error) {
      console.log(error);
      tokenHeader.unset();
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(
          error.response?.data.message || "Unknown error",
        );
      }

      return thunkAPI.rejectWithValue("Unknown error");
    }
  },
);
