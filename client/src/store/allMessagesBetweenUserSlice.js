import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name: 'messages',
    initialState: {
        messages: [],
    },

    reducers: {
        setMessage: (state, action) => {
            state.messages = action.payload;
        },

        addMessage: (state, action) => {
            state.messages.push(action.payload);
        }
    }
});

export const { setMessage, addMessage } = messageSlice.actions;

export default messageSlice.reducer;