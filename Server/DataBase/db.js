import mongoose from "mongoose";
import {config} from 'dotenv'
config();
const db = process.env.DB_URL
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(db)
        console.log("DataBase Connected!!")
    } catch (error) {
        console.log(`DataBase Error : %{error}`)
    }
}

export default connectDB