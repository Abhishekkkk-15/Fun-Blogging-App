import { io } from "socket.io-client";

// const BASE_URL = "https://fun-blogging-app.onrender.com/";
const BASE_URL = "http://localhost:8000/";

export const socket = io(BASE_URL,{
    transports: ["websocket"], 
    reconnection: true,    
})