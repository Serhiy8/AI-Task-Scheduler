import { createSlice } from "@reduxjs/toolkit";
import { createAiMessage } from "./operations/aiOperations";

export enum AiMessagePriority {
  Low = "low",
  Medium = "medium",
  High = "high",
}

export interface AiMessage {
  title: string;
  description: string;
  priority: string;
}

interface AiState {
  messages: AiMessage;
  isLoading: boolean;
  error: string | null | undefined;
  isHidden: boolean;
}

export const initialState: AiState = {
  messages: {
    title: "",
    description: "What's the plan for today?",
    priority: "",
  },
  isLoading: false,
  error: null,
  isHidden: false,
};

export const aiSlice = createSlice({
  name: "aiMessages",
  initialState,
  reducers: {
    setIsHidden(state, action) {
      state.isHidden = action.payload;
    },
    setMessage(state, action) {
      state.messages = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAiMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAiMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = action.payload;
      })
      .addCase(createAiMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string | null | undefined;
      });
  },
});

export const { setIsHidden, setMessage } = aiSlice.actions;
export default aiSlice.reducer;
