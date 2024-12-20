import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./Slices/postReducer"; // Import the default reducer
import userReducer from './Slices/userSlice'
import  messageReducer from "./Slices/messageSlice";
import  socketReducer  from "./Slices/socketSlice";

export const store = configureStore({
  reducer: {
    post: postReducer, // Key must match the intended slice name
    user:userReducer,
    message:messageReducer,
    sockets:socketReducer,
  },
});
