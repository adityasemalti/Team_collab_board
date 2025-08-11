import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import { connectDB } from './db/db.js'
import boardRouter from './routes/boardroutes.js'
const app = express()
 
const port = process.env.PORT || 3000;
app.use(cors())
app.use(express.json())
app.use('/api/board', boardRouter)
app.get('/',(req,res)=>{
    res.send("Api running")
})


connectDB()
app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})