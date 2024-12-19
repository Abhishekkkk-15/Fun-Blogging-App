import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   selectedUser : null,
   messages:null
  };

export const messageSlice = createSlice({
    name:"message",
    initialState,
    reducers:{
        setSelectedUser : (state,action) =>{
            state.selectedUser = action.payload
        },
        setMessages : (state,action) =>{
            state.messages = action.payload
        },
        
    }
})

export const {setSelectedUser,setMessages} = messageSlice.actions
export default messageSlice.reducer