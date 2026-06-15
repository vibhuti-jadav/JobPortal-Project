

import express from "express"

const app = express()

app.get("/",(req,res)=>{
    res.status(200).json("hello from server")
})

const PORT = 5000

app.listen(PORT,()=>{
    console.log(`server runig on ${PORT}`)
})  