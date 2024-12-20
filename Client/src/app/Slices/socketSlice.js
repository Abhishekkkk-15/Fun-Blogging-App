import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

let socket = null // Store the socket instance outside Redux

const initialState = {
  isConnected: false,
};

const BASE_URL = "http://localhost:8000";

export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    setConnected: (state) => {
      state.isConnected = true;
    },
    setDisconnected: (state) => {
      state.isConnected = false;
    },
  },
});

// Thunks for managing the socket connection
export const connectSocket = () => (dispatch) => {
  if (!socket) {
    socket = io(BASE_URL);

    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
      dispatch(setConnected());
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected");
      dispatch(setDisconnected());
    });
  } else {
    console.log("Socket is already connected");
  }
};

export const disconnectSocket = () => (dispatch) => {
  if (socket) {
    socket.disconnect();
    socket = null;
    dispatch(setDisconnected());
  }
};

export const { setConnected, setDisconnected } = socketSlice.actions;
export default socketSlice.reducer;
