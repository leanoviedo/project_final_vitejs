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
            state.messages.push({ ...action.payload, likes: 0, likedBy: [] })
            
        },
        addLike: (
            state,
            action: PayloadAction<{ index: number; username: string }>
        ) => {
            const { index, username } = action.payload;
            if (!state.messages[index].likedBy.includes(username)) {
                state.messages[index].likes++;
                state.messages[index].likedBy.push(username);
            }
        },
        removeLike: (
            state,
            action: PayloadAction<{ index: number; username: string }>
        ) => {
            const { index, username } = action.payload;
            const likedIndex = state.messages[index].likedBy.indexOf(username);
            if (likedIndex !== -1) {
                state.messages[index].likes--;
                state.messages[index].likedBy.splice(likedIndex, 1);
            }
        },
    },
});

export const { addMessage, addLike, removeLike } = chatSlice.actions;

export default chatSlice.reducer;