// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: null,
  isLoggedIn: false, // Renamed to 'isLoggedIn' for consistency
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
    },
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload; // Correct field name
    },
  },
});

export const { setUser, setLoggedIn } = userSlice.actions;
export default userSlice.reducer;
