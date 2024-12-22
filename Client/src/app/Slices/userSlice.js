import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: [],
  isLoggedIn: false,
  theme: localStorage.getItem('theme'),
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
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem("theme", action.payload);
    },
  },
  });

export const { setUser, setLoggedIn, clearUser,setTheme } = userSlice.actions;
export default userSlice.reducer;
