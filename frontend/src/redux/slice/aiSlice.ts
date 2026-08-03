import { createSlice } from "@reduxjs/toolkit";
import { createAiMessage } from "./operations/aiOperations";

export enum AiMessagePriority {
    Low = "low",
    Medium = "medium",
    High = "high"
}

export interface AiMessage {
    title: string;
    description: string;
    priority: AiMessagePriority;
}

interface AiState {
    aiMessages: AiMessage[];
    isLoading: boolean;
    error: string | null;
}

const initialState: AiState = {
    aiMessages: [],
    isLoading: false,
    error: null,
};

export const aiSlice = createSlice({
  name: "aiMessages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(createAiMessage.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(createAiMessage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.aiMessages.push(action.payload);
    })
    .addCase(createAiMessage.rejected, (state, action) => {
      state.isLoading = false;
      state.error =
        typeof action.payload === "string"
          ? action.payload
          : action.error.message ?? "Failed to create AI message";
    });
  }
});

export default aiSlice.reducer;