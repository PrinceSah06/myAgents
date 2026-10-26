import express from 'express'
import dotenv from 'dotenv'
import connectDb from './config/db.js';
import AuthRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';

// import


dotenv.config()

const port = process.env.PORT
const app = express()
app.use(express.json())
app.use(cookieParser())


app.use("/",AuthRouter)
app.get("/",(req,res)=>{
res.json({message:"Hello form Auth Service"})
})

app.listen(port,()=>{
    console.log('Auth service is running on port no.',port)
connectDb()


})
