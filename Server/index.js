import express, { urlencoded } from 'express'
import { config } from 'dotenv';
import connectDB from './DataBase/db.js';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import router from './routes/routes.js';
import bodyParser from 'body-parser';
import { app,server } from './lib/socket.js';

config()

app.use(cors({
    origin: 'https://fun-blogging-app.vercel.app', // Adjust this to your frontend URL
    // origin: 'http://localhost:5173',
    credentials: true // Allow credentials (cookies)
}))
app.use(cookieParser())
app.use(express.json({ limit: "10mb" })); // Adjust the limit as needed
app.use(express.urlencoded({ limit: "10mb", extended: true })); // For URL-encoded form data

// If using body-parser (optional)
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
connectDB()
.then(()=>{
    console.log("DataBase Connected")
})
.catch(error=>{
    console.log(`DataBase Error : ${error}`)
})

// Routes
app.use("/fun-blog",router)

server.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`))