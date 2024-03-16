import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../Store";
import { Message } from "../../model/interface";
interface ChatState {
  messages: Message[];
}

const initialState: ChatState = {
  messages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    markMessageAsRead: (state, action: PayloadAction<string>) => {
      state.messages = state.messages.map((message) =>
        message.id === action.payload
          ? { ...message, hasNewMessage: false }
          : message
      );
    },
  },
});

export const { addMessage, markMessageAsRead } = chatSlice.actions;

export const selectMessages = (state: RootState) => state.chat.messages;

export default chatSlice.reducer;
