import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./Slices/postReducer"; // Import the default reducer

export const store = configureStore({
  reducer: {
    post: postReducer, // Key must match the intended slice name
  },
});
