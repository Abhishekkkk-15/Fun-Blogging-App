import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./Slices/postReducer"; // Import the default reducer
import userReducer from './Slices/userSlice'

export const store = configureStore({
  reducer: {
    post: postReducer, // Key must match the intended slice name
    user:userReducer
  },
});
