import { io } from "socket.io-client";

const BASE_URL = "http://localhost:8000";

export const socket = io(BASE_URL,{
    transports: ["websocket"], 
    reconnection: true,    
})