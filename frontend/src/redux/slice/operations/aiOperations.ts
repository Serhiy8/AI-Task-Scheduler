import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../../../api/api";

interface message {
  text: string;
}

export const createAiMessage = createAsyncThunk(
  "aiMessages/create",
  async (message: message, thunkAPI) => {
    try {
      const res = await api.post("tasks/ai", message);
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.response?.data.message);
      }

      return thunkAPI.rejectWithValue("Unknown error");
    }
  },
);
