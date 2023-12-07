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
  username:{
    type: String,
    required: true,
  },
  created_at:{
    type: String,
    required: true,
  },
  likes:{
    type: Number,
    
  },
  views:{
    type: Number,
    
  },
  approved:{
    type: Boolean,
    default: false,

  },
  profilePic:{
    type:String,
    required:true
  }

})

const blogs =mongoose.model("blogs",blogSchema)
module.exports=blogs