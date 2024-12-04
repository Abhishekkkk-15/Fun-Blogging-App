import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: {}, // Fixed typo from `artical` to `articles`
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPost: (state, action) => {
      state.posts = action.payload;
    },
  },
});

export const { setPost } = postSlice.actions; // Use updated action name
export default postSlice.reducer; // Default export the reducer
