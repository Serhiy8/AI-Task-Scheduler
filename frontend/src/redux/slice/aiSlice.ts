import { createSlice } from "@reduxjs/toolkit";
import { createAiMessage } from "./operations/aiOperations";

export enum AiMessagePriority {
  Low = "Low",
  Medium = "Medium",
  High = "High",
}

export interface AiMessage {
  title: string;
  description: string;
  priority: AiMessagePriority;
}

interface AiState {
  messages: AiMessage;
  isLoading: boolean;
  error: string | null | undefined;
}

export const initialState: AiState = {
  messages: {
    title: "",
    description: "What's the plan for today?",
    priority: AiMessagePriority.Low,
  },
  isLoading: false,
  error: null,
};

export const aiSlice = createSlice({
  name: "aiMessages",
  initialState,
  reducers: {
    setMessage(state, action) {
      state.messages = { ...state.messages, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAiMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAiMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = { ...state.messages, ...action.payload };
      })
      .addCase(createAiMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string | null | undefined;
      });
  },
});

export const { setMessage } = aiSlice.actions;
export default aiSlice.reducer;
