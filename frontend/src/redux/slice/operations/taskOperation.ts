import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../../../api/api";
import type { AiMessagePriority } from "../aiSlice";

export interface Task {
  description: string;
  status: boolean;
  title: string;
  task_id: string;
  user_id: string;
  created_at: string;
  priority: AiMessagePriority;
}

interface NewTask {
  description: string;
  title: string;
  priority: AiMessagePriority;
}

interface TaskForUpdate {
  task_id: string;
  description?: string;
  title?: string;
  priority?: AiMessagePriority;
}

export const getTasks = createAsyncThunk<Task[], void, { rejectValue: string }>(
  "tasks",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("tasks");
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return thunkAPI.rejectWithValue(error.response?.data.message);
      }

      return thunkAPI.rejectWithValue("Failed to fetch tasks");
    }
  },
);

export const createTask = createAsyncThunk<
  Task,
  NewTask,
  { rejectValue: string }
>("tasks/create", async (credential: NewTask, thunkAPI) => {
  try {
    const res = await api.post("tasks", credential);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(error.response?.data.message);
    }

    return thunkAPI.rejectWithValue("Failed to create task");
  }
});

export const updateTaskById = createAsyncThunk<
  Task,
  TaskForUpdate,
  { rejectValue: string }
>("tasks/update", async (credential: TaskForUpdate, thunkAPI) => {
  try {
    const res = await api.patch("tasks", credential);    
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(error.response?.data.message);
    }

    return thunkAPI.rejectWithValue("Failed to update task");
  }
});

export const getTaskById = createAsyncThunk<
  Task,
  string,
  { rejectValue: string }
>("tasks/byId", async (taskId: string, thunkAPI) => {
  try {
    const res = await api.get(`tasks/${taskId}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(error.response?.data.message);
    }
    return thunkAPI.rejectWithValue("Failed to get task");
  }
});

export const removeTask = createAsyncThunk<
  Task,
  string,
  { rejectValue: string }
>("tasks/remove", async (taskId: string, thunkAPI) => {
  try {
    const res = await api.delete(`tasks/${taskId}`);
    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(error.response?.data.message);
    }

    return thunkAPI.rejectWithValue("Failed to remove task");
  }
});
