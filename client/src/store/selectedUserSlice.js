import { createSlice } from "@reduxjs/toolkit"

const loggedInUserSlice = createSlice({
    name: 'selectedUser',
    initialState: {
        selectedUser: null,
    },
    reducers: {
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },

        clearSelectedUser: (state) => {
            state.selectedUser = null;
        }
    }
});

// Export the actions for use in components
export const { setSelectedUser, clearSelectedUser, setSelectedUserClick } = loggedInUserSlice.actions;

// Export the reducer to include in the store
export default loggedInUserSlice.reducer;