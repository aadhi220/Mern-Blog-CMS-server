const mongoose = require('mongoose')



const userSchema = new mongoose.Schema({

username:{
    type: String,
    required: true,
    unique: true,
    
},
email:{
    type: String,
    required: true,
    unique: true,
},

password:{
    type: String,
    required: true,
},
isAuthor:{
    type: Boolean,
    default: false,
},
authorRequest:{
    type: Boolean,
    default: false,
},
isAdmin:{
    type: Boolean,
    default: false,
},
profilePic:{
    type: String,
    
},
created_at:{
    type:String,
    
    
},
job:{
    type: String,

},
subscribed:{
    type:Array,
    default:[]
}






})

const users =mongoose.model("users",userSchema)
module.exports=users