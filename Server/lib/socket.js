import { Server } from 'socket.io'
import http from 'http'
import express from 'express'

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: ['http://localhost:5173']
    }
})

export function getReciverSocketId(userId) {
    return userSocketMap[userId]
}

const userSocketMap = {}

io.on('connection', (socket) => {
    const { userId } = socket.handshake.auth
    if (!userId) {
        console.error('User ID missing in handshake');
        socket.disconnect();
        return;
      }
    userSocketMap[userId] = socket.id
    console.log("User connected ", socket.id)
    console.log("MongoId ", userId)
    socket.emit("onlineUser", Object.keys(userSocketMap))
    console.log(Object.keys(userSocketMap))
    socket.on('disconnect', () => {
        console.log("User disconnected ", socket.id)
    })
})

export { io, app, server }
