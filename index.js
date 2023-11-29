require("dotenv").config();
const express = require("express");
const cors=require("cors");
const router = require('./Routes/router')
require('./DB/connection')
const blogServer=express();
blogServer.use(cors());
blogServer.use(express.json())
blogServer.use(router)
blogServer.use('/uploads',express.static('./uploads'))
const PORT =4000 || process.env.PORT

blogServer.listen(PORT,()=> {
    console.log(`Server is running on port ${PORT}`)
})

blogServer.get('/',(req,res)=>{

    res.send('<h1> Blog server started </h1>')
})

blogServer.post('/',(req,res)=>{
    res.send("post reqest");
})

blogServer.put('/',(req,res)=>{
    res.send("PUT reqest");
})