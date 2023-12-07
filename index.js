require("dotenv").config();
const express = require("express");
const cors=require("cors");
const router = require("./Routes/router")
require('./DB/connection')
const blogServer=express();
blogServer.use(cors());
blogServer.use(express.json())
blogServer.use(router)
blogServer.use('/uploads',express.static('./uploads'))
const PORT =4000 || process.env.PORT

blogServer.listen(PORT,()=> {
    console.log(`Server successfully started running on port ${PORT}`)
    console.log(``)
})

blogServer.get('/',(req,res)=>{

    res.send(`<h1> Server successfully started running on port ${PORT} </h1> <h3><a href="https://mern-blog-cms.vercel.app/" >Redirect to website frontend </a></h3>`)
})

blogServer.post('/',(req,res)=>{
    res.send("post reqest");
})

blogServer.put('/',(req,res)=>{
    res.send("PUT reqest");
})