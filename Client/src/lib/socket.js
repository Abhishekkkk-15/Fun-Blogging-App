import { io } from "socket.io-client";

const BASE_URL = "https://fun-blogging-app.onrender.com/";

export const socket = io(BASE_URL,{
    transports: ["websocket"], 
    reconnection: true,    
})