const express = require("express")
const mongoose = require("mongoose")
const port = 2022
const path = require("path")
const router = require("./router/router")


const app = express()

app.use(express.json())

const url = "mongodb://localhost/AdanionSocialApp"
mongoose.connect(url).then(()=>{
    console.log("Connected successfully to DB")
})

app.get("/", (req,res)=>{
    res.send("Welcome to Adanion Social App")
})

app.use("/", router)

app.listen(port, ()=>{
    console.log("Listening to port", port)
})