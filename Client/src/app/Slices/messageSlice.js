import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedUser: null,
    messages: [],
    onlineUsers:[]
};

export const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload
        },
        setMessages: (state, action) => {
            if (Array.isArray(action.payload)) {
                state.messages = action.payload; // this is for the array of messages
            } else {
                // Append the new message to the existing array of messages
                state.messages = [...state.messages, action.payload];
            }
        },
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload
        }
    }
})

export const { setSelectedUser, setMessages,setOnlineUsers } = messageSlice.actions
export default messageSlice.reducer