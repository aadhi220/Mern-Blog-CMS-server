const mongoose = require('mongoose')


const blogSchema = new mongoose.Schema({
title:{
    type: String,
    required: true,
},
caption:{
    type: String,
    required: true,
},
category:{
    type: String,
    required: true,
},
images:{
    type: Array,
    required: true,
},
content:{
    type: String,
    required: true,
},
userId: {
    type: String,
    required: true,
  },
  userName:{
    type: String,
    required: true,
  },
  dateCreated:{
    type: Date,
    required: true,
  },
  likes:{
    type: Number,
    required: true,
  },
  views:{
    type: Number,
    required: true,
  }


})

const blogs =mongoose.model("blogs",blogSchema)
module.exports=blogs