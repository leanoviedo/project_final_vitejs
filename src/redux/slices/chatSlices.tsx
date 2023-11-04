import { PayloadAction, createSlice } from "@reduxjs/toolkit";
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
            state.messages.push({ ...action.payload, })

        },

    },
});

export const { addMessage, } = chatSlice.actions;

export default chatSlice.reducer;