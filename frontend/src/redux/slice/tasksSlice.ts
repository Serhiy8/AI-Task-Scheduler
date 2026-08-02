import { createSlice } from "@reduxjs/toolkit";
import { createTask, getTasks, removeTask } from "./operations/taskOperation";
import type { Task } from "./operations/taskOperation";

interface TasksState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  isLoading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Failed to fetch tasks";
      })
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Failed to create task";
      })
      .addCase(removeTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = state.tasks.filter((task) => task.task_id !== action.payload.task_id);
      })
      .addCase(removeTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Failed to remove task";
      })
  },
});

export default tasksSlice.reducer;
