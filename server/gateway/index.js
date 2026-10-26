import express from 'express'
import dotenv from 'dotenv'
import proxy from 'express-http-proxy'
import cors from'cors'
import cookieParser from 'cookie-parser'
import  getCurrentUser  from "./controllers/user.controller.js"
import protect from './middleware/auth.middleware.js'
import { proxywithHeader } from './utils/proxyWithHeader.js';
dotenv.config()


const port  = process.env.PORT

const app = express()
app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true
}))
app.use(cookieParser())
 
app.use("/api/auth",proxy(process.env.AUTH_SERVICE))
app.use("/api/chat",protect,proxywithHeader(process.env.CHAT_SERVICE))
app.use("/api/agent",protect,proxywithHeader(process.env.AGENT_SERVICE))

app.get("/api/me", protect, getCurrentUser)

app.listen(port,()=>{
    console.log("Gateway stated at ",port)
})
