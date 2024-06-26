import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Message } from "../../model/interface";
import { RootState } from "../Store";

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
      state.messages.push({ ...action.payload });
    },
    markMessageAsRead: (state, action: PayloadAction<string>) => {
      const messageId = action.payload;
      const messageToMark = state.messages.find(
        (message) => message.id === messageId
      );
      if (messageToMark) {
        messageToMark.messageRead = true;
      }
    },
  },
});

export const selectUnreadMessages = (state: RootState) =>
  state.chat.messages.filter((message) => !message.messageRead);

export const { addMessage, markMessageAsRead } = chatSlice.actions;
export const selectMenssage = (state: RootState) => state.chat.messages;
export default chatSlice.reducer;
