const mongoose = require('mongoose')


const subscribeSchema = new mongoose.Schema({
email:{
    type: String,
    required: true,
},
author:{
    type: String,
    required: true,
},
created_at:{
    type: String,
    required: true,
}
})

const subscribe =mongoose.model("subscribe",subscribeSchema)
module.exports=subscribe