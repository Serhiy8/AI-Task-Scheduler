import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { AiMessage } from "../aiSlice";
import { api } from "../../../api/api";

export const createAiMessage = createAsyncThunk(
  "aiMessages/create",
  async (message: AiMessage, thunkAPI) => {
    try {
      const res = await api.post("tasks/ai", message);
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(
          error.response?.data.message
        );
      }

      return thunkAPI.rejectWithValue("Unknown error");
    }
  })