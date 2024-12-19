import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData:  [],
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
      // localStorage.setItem('userData', JSON.stringify(action.payload));
    },
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
      localStorage.setItem('isLoggedIn', JSON.stringify(action.payload));
    },
    clearUser: (state) => {
      state.userData = null;
      state.isLoggedIn = false;
      localStorage.removeItem('userData');
      localStorage.removeItem('isLoggedIn');
    },
  },
});

export const { setUser, setLoggedIn, clearUser } = userSlice.actions;
export default userSlice.reducer;
