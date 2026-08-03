import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../../../api/api";
import { toast } from "react-toastify";

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
            toast.error(error.response?.data.message);
        return thunkAPI.rejectWithValue(error.response?.data.message);
      }

      return thunkAPI.rejectWithValue("Unknown error");
    }
  },
);
