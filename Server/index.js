import express, { urlencoded } from 'express'
import { config } from 'dotenv';
import connectDB from './DataBase/db.js';
import cors from 'cors'
import cookieParser from 'cookie-parser'
import router from './routes/routes.js';

config()

const app = express()

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
connectDB()
.then(()=>{
    console.log("DataBase Connected")
})
.catch(error=>{
    console.log(`DataBase Error : ${error}`)
})

// Routes
app.use("/fun-blog",router)

app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`))