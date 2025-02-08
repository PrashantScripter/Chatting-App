import { createSlice } from "@reduxjs/toolkit"

const loggedInUserSlice = createSlice({
    name: 'loggedInUser',
    initialState: {
        loggedInUser: null,
        friends:[],
        onlineUsers: [],
    },
    reducers: {
        setUser: (state, action) => {
            state.loggedInUser = action.payload;
        },

        setFriends:(state, action) => {
            state.friends = action.payload;
        },

        clearUser: (state) => {
            state.loggedInUser = null;
        },

        clearFriends:(state) => {
            state.friends = [];
        },

        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        },
    }
});

// Export the actions for use in components
export const { setUser, clearUser, setFriends, clearFriends, setOnlineUsers } = loggedInUserSlice.actions;

// Export the reducer to include in the store
export default loggedInUserSlice.reducer;